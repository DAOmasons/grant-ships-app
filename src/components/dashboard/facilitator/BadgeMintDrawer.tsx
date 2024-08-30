import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  BadgeManager,
  ResolvedTemplate,
} from '../../../queries/getBadgeManager';
import { PageDrawer } from '../../PageDrawer';
import { TxButton } from '../../TxButton';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { isAddress, parseEther } from 'viem';
import { useTx } from '../../../hooks/useTx';
import ScaffoldShaman from '../../../abi/ScaffoldShaman.json';
import { BADGE_SHAMAN } from '../../../constants/addresses';
import { useState } from 'react';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { reasonSchema } from '../../../utils/ipfs/metadataValidation';

const badgeMintFormSchema = z.object({
  badges: z.array(
    z.object({
      comment: z.string(),
      recipientAddress: z
        .string()
        .min(1, { message: 'Send address is required' })
        .refine((val) => isAddress(val), { message: 'Invalid address' }),
      amount: z.number(),
    })
  ),
});

export const BadgeMintDrawer = ({
  opened,
  onClose,
  shaman,
  onPollSuccess,
  selectedTemplate,
}: {
  selectedTemplate: ResolvedTemplate;
  shaman?: BadgeManager;
  opened: boolean;
  onClose: () => void;
  onPollSuccess: () => void;
}) => {
  const [numBadges, setNumBadges] = useState([undefined]);
  const [isPinning, setIsPinning] = useState(false);
  const theme = useMantineTheme();
  const { tx } = useTx();

  const form = useForm({
    initialValues: {
      badges: [
        {
          recipientAddress: '',
          comment: '',
          amount: 0,
        },
      ],
    },
    validateInputOnBlur: true,
    validate: zodResolver(badgeMintFormSchema),
  });

  const mintBadge = async () => {
    try {
      if (!shaman) return;

      const badgeIds: bigint[] = [];
      const amounts: bigint[] = [];
      const comments: [bigint, string][] = [];
      const recipients: string[] = [];

      setIsPinning(true);

      await Promise.all(
        numBadges.map(async (_, i) => {
          const badgeFormData = form.values.badges[i];

          if (!badgeFormData) {
            setIsPinning(false);
            return;
          }

          const recipientAddress = badgeFormData.recipientAddress;
          if (!isAddress(recipientAddress)) {
            form.setFieldError(
              `badges.${i}.recipientAddress`,
              'Invalid address'
            );
            setIsPinning(false);
            return;
          }

          badgeIds.push(selectedTemplate.badgeId);
          amounts.push(parseEther(badgeFormData.amount.toString()) || 0n);

          if (badgeFormData.comment.length > 0) {
            const validated = reasonSchema.safeParse({
              reason: badgeFormData.comment,
            });

            if (!validated.success) {
              notifications.show({
                title: 'Error',
                message: validated.error.message,
                color: 'red',
              });
              setIsPinning(false);
              return;
            }

            const ipfsRes = await pinJSONToIPFS({
              reason: badgeFormData.comment || '',
            });

            if (ipfsRes.IpfsHash[0] !== 'Q') {
              notifications.show({
                title: 'IPFS Error',
                message: ipfsRes.IpfsHash[1],
                color: 'red',
              });
              setIsPinning(false);
              return;
            }

            comments.push([1n, ipfsRes.IpfsHash] || '');
          } else {
            comments.push([0n, 'NULL']);
          }
          recipients.push(badgeFormData.recipientAddress);
        })
      );

      onClose();

      setIsPinning(false);

      const args = [badgeIds, amounts, comments, recipients];

      tx({
        writeContractParams: {
          abi: ScaffoldShaman,
          functionName: 'applyBadges',
          address: BADGE_SHAMAN,
          args,
        },
        writeContractOptions: {
          onPollSuccess() {
            onPollSuccess?.();
          },
        },
      });
    } catch (error) {
      console.error(error);

      notifications.show({
        title: 'Error',
        message: (error as Error).message,
        color: 'red',
      });
      setIsPinning(false);
    }
  };

  return (
    <PageDrawer opened={opened} onClose={onClose} closeOnBack>
      <Box pb="xl">
        <Text mb="lg" fz="lg" fw={600}>
          Create a Badge
        </Text>
      </Box>
      <Group align="start" justify="space-between" mb="xl">
        <Avatar
          bg={theme.colors.dark[5]}
          src={selectedTemplate.templateMetadata.imgUrl}
          size={240}
          pos="relative"
        />
        <TxButton
          disabled={form.isValid() === false}
          loading={isPinning}
          leftSection={<IconPlus />}
          onClick={mintBadge}
        >
          Mint Badge
        </TxButton>
      </Group>
      <Stack mb="xl">
        {numBadges.map((_, i) => (
          <Stack gap={'sm'} key={`badge-section-${i}`}>
            <Group align="end" justify="space-between">
              <TextInput
                label="Recipient Address"
                placeholder="0x..."
                maw={280}
                w={'100%'}
                required
                {...form.getInputProps(`badges.${i}.recipientAddress`)}
              />
              {i === numBadges.length - 1 && (
                <Button
                  variant="secondary"
                  leftSection={<IconTrash size={18} />}
                  onClick={() => {
                    setNumBadges(numBadges.filter((_, j) => j !== i));
                    form.setValues({
                      badges: form.values.badges.filter((_, j) => j !== i),
                    });
                  }}
                >
                  Delete Badge
                </Button>
              )}
            </Group>
            <Textarea
              label="Comment"
              placeholder="Enter a comment to accompany the badge (optional)"
              autosize
              minRows={4}
              maxRows={8}
              {...form.getInputProps(`badges.${i}.comment`)}
              mb={selectedTemplate.hasFixedAmount ? 'md' : 'sm'}
            />
            {selectedTemplate.hasFixedAmount === false && (
              <NumberInput
                label="Amount"
                placeholder={`Enter the amount of ${selectedTemplate.isVotingToken ? shaman?.sharesToken.symbol : shaman?.lootToken.symbol} to mint to the recipient`}
                required
                {...form.getInputProps(`badges.${i}.amount`)}
              />
            )}
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Group justify="center" pb="xl">
        <Button
          leftSection={<IconPlus />}
          variant="secondary"
          onClick={() => {
            form.setValues({
              badges: [
                ...form.values.badges,
                {
                  recipientAddress: '',
                  comment: '',
                  amount: 0,
                },
              ],
            });
            setNumBadges([...numBadges, undefined]);
          }}
        >
          Add Badge
        </Button>
      </Group>
    </PageDrawer>
  );
};
