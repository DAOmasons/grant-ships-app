import { PageDrawer } from '../PageDrawer';
import { Group, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';
import { useGrant } from '../../hooks/useGrant';
import { TxButton } from '../TxButton';
import { IconFileDescription, IconPencil } from '@tabler/icons-react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Content, useEditor } from '@tiptap/react';
import { useTx } from '../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { tipTapApplicationSchema } from '../forms/validationSchemas/tiptap';
import { pinJSONToIPFS } from '../../utils/ipfs/pin';
import AlloAbi from '../../abi/Allo.json';
import { ADDR } from '../../constants/addresses';
import {
  Address,
  encodeAbiParameters,
  isAddress,
  parseAbiParameters,
  parseEther,
} from 'viem';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { RTEditor } from '../RTEditor';
import { IconCalendar } from '@tabler/icons-react';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { DatePickerInput } from '@mantine/dates';
import { GameStatus } from '../../types/common';

const applicationSchema = z.object({
  sendAddress: z
    .string()
    .min(1, { message: 'Send address is required' })
    .refine((val) => isAddress(val), { message: 'Invalid address' }),
  amount: z
    .string()
    .min(1)
    .regex(/^\d+(\.\d+)?$/, 'Must be a number')
    .refine((value) => {
      const decimalPart = value.split('.')[1];
      return !decimalPart || decimalPart.length <= 18;
    }, 'Number must not have more than 18 decimal places'),
  dueDate: z.date().nullable(),
});

type FormValues = z.infer<typeof applicationSchema>;

export const ApplicationDrawer = ({
  opened,
  onClose,
  content,
  initialDueDate,
  initialAmount,
  initialSendAddress,
}: {
  initialDueDate?: Date;
  initialAmount?: string;
  initialSendAddress?: string;
  content: Content;
  opened: boolean;
  onClose: () => void;
}) => {
  const { project, ship, refetchGrant, currentApplication } = useGrant();
  const { tx } = useTx();
  const theme = useMantineTheme();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content,
  });

  const form = useForm({
    initialValues: {
      sendAddress: initialSendAddress || '',
      amount: initialAmount || '',
      dueDate: initialDueDate || null,
    },
    validate: zodResolver(applicationSchema),
    validateInputOnBlur: true,
  });

  const handlePostApplication = async () => {
    if (!ship?.shipContractAddress || !project?.id) {
      notifications.show({
        title: 'Error',
        message: 'Ship address or project ID is missing',
        color: 'red',
      });

      return;
    }

    if (!editor) {
      notifications.show({
        title: 'Error',
        message: 'No content to post',
        color: 'red',
      });

      return;
    }

    const { dueDate, amount, sendAddress } = form.values as FormValues;

    if (!dueDate || !amount || !sendAddress) {
      notifications.show({
        title: 'Error',
        message: 'Please fill out all fields',
        color: 'red',
      });

      return;
    }

    const amountExceedsBalance =
      ship.balance && amount && parseEther(amount) > BigInt(ship.balance);

    if (amountExceedsBalance) {
      notifications.show({
        title: 'Error',
        message: 'Amount exceeds balance',
        color: 'red',
      });

      return;
    }

    const dateInSeconds = Math.round(dueDate.getTime() / 1000);

    const rtMetadata = tipTapApplicationSchema.safeParse({
      content: editor.getJSON(),
      dueDate: dateInSeconds,
    });

    if (!rtMetadata.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Beacon text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    onClose();

    const pinRes = await pinJSONToIPFS(rtMetadata.data);

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    const parsedUnits = parseEther(amount);

    const encoded = encodeAbiParameters(
      parseAbiParameters('address, address, uint256, (uint256, string)'),
      [
        project.id as Address,
        sendAddress as Address,
        parsedUnits,
        [1n, pinRes.IpfsHash],
      ]
    );

    tx({
      writeContractParams: {
        abi: AlloAbi,
        address: ADDR.ALLO,
        functionName: 'registerRecipient',
        args: [ship.poolId, encoded],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGrant();
        },
      },
    });
  };

  const alreadyHasApplication = !!currentApplication;

  return (
    <PageDrawer
      pageTitle="Post Application"
      opened={opened}
      onClose={onClose}
      closeOnBack
    >
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Project}
          imgUrl={project?.metadata?.imgUrl}
          name={project?.name}
        />
        <TxButton
          leftSection={
            alreadyHasApplication ? <IconPencil /> : <IconFileDescription />
          }
          onClick={handlePostApplication}
        >
          {alreadyHasApplication ? 'Resubmit' : 'Apply'}
        </TxButton>
      </Group>
      {alreadyHasApplication &&
        currentApplication.status !== GameStatus.Rejected && (
          <Text mb="md" size="sm" c={theme.colors.yellow[6]}>
            WARNING: You have already submitted an application. Resubmitting an
            old application will overwrite the previous one and restart the
            grant process from the beginning.
          </Text>
        )}
      <Stack mb="md">
        <DatePickerInput
          label="Expected delivery"
          w={292}
          required
          leftSection={<IconCalendar size={16} />}
          placeholder="Date"
          {...form.getInputProps('dueDate')}
        />
        <TextInput
          label="Amount Requested"
          w={292}
          required
          placeholder={GAME_TOKEN.SYMBOL}
          {...form.getInputProps('amount')}
        />
        <TextInput
          label="Send Address"
          w={292}
          required
          {...form.getInputProps('sendAddress')}
        />
      </Stack>
      <RTEditor editor={editor} />
    </PageDrawer>
  );
};
