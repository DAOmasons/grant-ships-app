import { useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  FileButton,
  Flex,
  Group,
  InputLabel,
  NumberInput,
  Radio,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBadge,
  IconCameraPlus,
  IconPencil,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';
import { getGatewayUrl } from '../utils/ipfs/get';
import { pinFileToIPFS, pinJSONToIPFS } from '../utils/ipfs/pin';
import { PageDrawer } from '../components/PageDrawer';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import {
  BadgeManager as BadgeShaman,
  getBadgeShaman,
  ResolvedTemplate,
} from '../queries/getBadgeManager';
import { useTx } from '../hooks/useTx';
import ScaffoldShaman from '../abi/ScaffoldShaman.json';
import { BADGE_SHAMAN } from '../constants/addresses';
import { TxButton } from '../components/TxButton';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
  badgeTemplateForm,
  badgeTemplateSchema,
} from '../components/forms/validationSchemas/badge';
import { formatEther, parseEther } from 'viem';
import { notifications } from '@mantine/notifications';
import { Bold } from '../components/Typography';

export const BadgeManager = () => {
  const theme = useMantineTheme();
  const [createOpened, { close: closeCreate, open: openCreate }] =
    useDisclosure(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<ResolvedTemplate | null>(null);

  const { data: shaman, refetch: refetchShaman } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShaman,
    enabled: true,
  });

  if (!shaman) return null;

  const selectTemplate = (template: ResolvedTemplate) => {
    if (shaman) {
      if (selectedTemplate?.badgeId === template.badgeId) {
        setSelectedTemplate(null);
      } else {
        setSelectedTemplate(template);
      }
    }
  };

  return (
    <Flex h={'200vh'}>
      <MainSection>
        <PageTitle title="Badge Manager" />
        <Group align="start" gap="md" w="100%" mb="xl">
          <Avatar
            bg={theme.colors.dark[5]}
            src={selectedTemplate?.templateMetadata.imgUrl || undefined}
            size={240}
            radius={'sm'}
            pos="relative"
          >
            <IconBadge size={80} />
          </Avatar>
          {selectedTemplate ? (
            <Stack w={280} gap="xs">
              <Text fw={600} lineClamp={1}>
                {selectedTemplate.name}
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                lineClamp={4}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedTemplate.templateMetadata.description}
              </Text>
              <Text fz={'sm'} opacity={0.8}>
                <Bold>Badge ID: </Bold>
                {selectedTemplate.badgeId}
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                c={
                  selectedTemplate?.isSlash
                    ? theme.colors.red[6]
                    : theme.colors.green[6]
                }
              >
                <Bold>
                  {selectedTemplate?.isSlash ? 'Penalty: ' : 'Reward: '}{' '}
                </Bold>
                {selectedTemplate?.hasFixedAmount
                  ? formatEther(selectedTemplate.amount)
                  : 'Dynamic (determined at mint)'}
              </Text>
              <Text fz={'sm'} opacity={0.8}>
                <Bold>Token: </Bold>
                {selectedTemplate.isVotingToken
                  ? `${shaman.sharesToken.symbol} (Voting Token)`
                  : `${shaman.lootToken.symbol} (Non-Voting Token)`}
              </Text>
            </Stack>
          ) : (
            <Stack w={280} gap="xs">
              <Text fw={600} lineClamp={1}>
                Badge Manager
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                lineClamp={4}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {shaman?.templates && shaman?.templates.length > 0
                  ? 'Select a badge from below to award it to any user'
                  : 'Create a new badge to award it to an user'}
              </Text>
            </Stack>
          )}
        </Group>
        <Divider mb="xl" />
        <Flex gap={'md'} wrap={'wrap'}>
          {shaman?.templates?.map((template) => (
            <Avatar
              key={template.badgeId}
              size={94}
              radius="sm"
              src={template.templateMetadata.imgUrl || ''}
              onClick={() => selectTemplate(template)}
            >
              <IconBadge />
            </Avatar>
          ))}
        </Flex>
        <BadgeTemplateDrawer
          opened={createOpened}
          onClose={closeCreate}
          shaman={shaman}
          onPollSuccess={() => {}}
        />
      </MainSection>
      <Box pos="relative" mt="82">
        <Stack pos="fixed">
          <Button
            onClick={openCreate}
            leftSection={<IconPlus />}
            variant="menu"
          >
            Create Badge
          </Button>
          {selectedTemplate && (
            <>
              <Button
                onClick={openCreate}
                leftSection={<IconUser />}
                variant="menu"
              >
                Apply Badge
              </Button>
              <Button
                onClick={openCreate}
                leftSection={<IconPencil />}
                variant="menu"
              >
                Edit Badge
              </Button>
              <Button
                onClick={openCreate}
                leftSection={<IconTrash />}
                variant="menu"
              >
                Delete Badge
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

type BadgeTemplateForm = z.infer<typeof badgeTemplateForm>;

const BadgeTemplateDrawer = ({
  opened,
  onClose,
  shaman,
  onPollSuccess,
}: {
  shaman?: BadgeShaman;
  opened: boolean;
  onClose: () => void;
  onPollSuccess: () => void;
}) => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      amount: 0,
      isVotingToken: 'nv',
      hasFixedAmount: 'fixed',
      isSlash: 'award',
    },
    validateInputOnBlur: true,
    validate: zodResolver(badgeTemplateForm),
  });

  const theme = useMantineTheme();
  const { tx } = useTx();
  const [isLoading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  const avatarPreview = ipfsHash ? getGatewayUrl(ipfsHash) : null;
  const canPreview = avatarPreview && !isLoading;

  const handleUpload = async (e: File | null) => {
    if (!e) {
      return;
    }
    setLoading(true);
    try {
      const res = await pinFileToIPFS(e);
      if (typeof res.IpfsHash !== 'string') return;
      setIpfsHash(res.IpfsHash);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const createBadge = async (values: BadgeTemplateForm) => {
    const amount =
      values.hasFixedAmount === 'fixed'
        ? parseEther(values.amount.toString())
        : 0n;

    const badgeMetadata = {
      avatarIPFSHash: ipfsHash,
      description: values.description,
    };

    const validation = badgeTemplateSchema.safeParse(badgeMetadata);

    if (!validation.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Badge metadata doesn't match the schema",
        color: 'red',
      });
      return;
    }

    const ipfsRes = await pinJSONToIPFS(badgeMetadata);

    if (typeof ipfsRes.IpfsHash !== 'string') {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin badge metadata to IPFS',
        color: 'red',
      });
      return;
    }

    onClose();

    const isVotingToken = values.isVotingToken === 'v';
    const isSlash = values.isSlash === 'slash';
    const isFixedAmount = values.hasFixedAmount === 'fixed';

    const args = [
      [
        values.name,
        [1n, ipfsRes.IpfsHash],
        amount,
        isVotingToken,
        isFixedAmount,
        isSlash,
        true,
      ],
    ];

    tx({
      writeContractParams: {
        abi: ScaffoldShaman,
        functionName: 'createBadge',
        address: BADGE_SHAMAN,
        args,
      },
      writeContractOptions: {
        onPollSuccess: () => {
          form.reset();
          setIpfsHash('');
          setLoading(false);
          onPollSuccess();
        },
      },
    });
  };

  return (
    <PageDrawer opened={opened} onClose={onClose} closeOnBack>
      <Box pb="xl">
        <Text mb="lg" fz="lg" fw={600}>
          Create a Badge
        </Text>
        <Group align="start" justify="space-between">
          <Box pos="relative" display={'inline-block'} mb="xl">
            <Avatar
              bg={theme.colors.dark[5]}
              src={canPreview ? avatarPreview : undefined}
              size={240}
              radius={'sm'}
              pos="relative"
            >
              <InputLabel
                c={theme.colors.dark[0]}
                pos="absolute"
                bottom={'55%'}
                right={'42%'}
                required
              ></InputLabel>
            </Avatar>
            <FileButton
              onChange={handleUpload}
              accept={'image/png,image/jpeg,image/webp'}
            >
              {(props) => (
                <ActionIcon
                  {...props}
                  pos={'absolute'}
                  bottom={'45%'}
                  left={'38%'}
                  radius="xl"
                  bg={'rgba(255, 255, 255, 0.05)'}
                  loading={isLoading}
                  disabled={isLoading}
                  w={'50px'}
                  h={'50px'}
                >
                  <IconCameraPlus />
                </ActionIcon>
              )}
            </FileButton>
          </Box>
          <TxButton
            disabled={form.isValid() === false || ipfsHash === ''}
            leftSection={<IconPlus />}
            onClick={() => createBadge(form.values)}
          >
            Create Template
          </TxButton>
        </Group>
        <Stack>
          <TextInput
            label="Badge Name"
            placeholder="Grant Ripper!"
            required
            {...form.getInputProps('name')}
          />
          <Textarea
            autosize
            required
            minRows={4}
            label="Badge Description"
            placeholder="A description of the badge. What is it for? What are the rules for getting assigned this badge?"
            {...form.getInputProps('description')}
          />
          <Radio.Group
            required
            defaultValue="fixed"
            label="Fixed or Dynamic Value"
            description={`Will the value of the token be decided at the time awarding a badge, or is it fixed?`}
            {...form.getInputProps('hasFixedAmount')}
          >
            <Stack gap="sm" mt="sm">
              <Radio label="Fixed" value="fixed" />
              <Radio label="Dynamic" value="dynamic" />
            </Stack>
          </Radio.Group>
          {form.values.hasFixedAmount === 'fixed' && (
            <NumberInput
              label="Badge Award Amount"
              placeholder="Grant Ripper!"
              required={form.values.hasFixedAmount === 'fixed'}
              hideControls={true}
              min={0}
              {...form.getInputProps('amount')}
            />
          )}
          <Radio.Group
            required
            label="Badge Reward Token"
            description={`Will the tokens awarded be in voting token ${shaman?.sharesToken.symbol} or non-voting token ${shaman?.lootToken.symbol}?`}
            {...form.getInputProps('isVotingToken')}
          >
            <Stack gap="sm" mt="sm">
              <Radio
                label={`Award ${shaman?.lootToken.symbol} Token`}
                value="nv"
              />
              <Radio
                label={`Award ${shaman?.sharesToken.symbol} Token`}
                value="v"
              />
            </Stack>
          </Radio.Group>
          <Radio.Group
            required
            defaultValue="award"
            label="Award/Slash"
            description="Will this badge award a balance of token the recipient or will it slash."
            {...form.getInputProps('isSlash')}
          >
            <Stack gap="sm" mt="sm">
              <Radio label="Award" value="award" />
              <Radio label="Slash" value="slash" />
            </Stack>
          </Radio.Group>
        </Stack>
      </Box>
    </PageDrawer>
  );
};
