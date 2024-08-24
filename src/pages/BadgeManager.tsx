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
import { pinFileToIPFS } from '../utils/ipfs/pin';
import { PageDrawer } from '../components/PageDrawer';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getBadgeShamans } from '../queries/getBadgeManager';

export const BadgeManager = () => {
  const theme = useMantineTheme();
  const [createOpened, { close: closeCreate, open: openCreate }] =
    useDisclosure(false);
  const { data } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShamans,
    enabled: true,
  });

  console.log('data', data);

  const badges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Flex h={'200vh'}>
      <MainSection>
        <PageTitle title="Badge Manager" />
        <Group align="start" gap="xl" w="100%" mb="xl">
          <Avatar
            bg={theme.colors.dark[5]}
            src={''}
            size={240}
            radius={'sm'}
            pos="relative"
          >
            <IconBadge size={80} />
          </Avatar>
          <Box w="40%">
            <Text fw={600} lineClamp={1}>
              Badge Name
            </Text>
            <Text
              fz={'sm'}
              opacity={0.8}
              lineClamp={4}
              style={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                width: '100%',
              }}
            >
              sdfalkjdfl;aksjdflkasjdflkjasdlfkjasdlkfj asdlkfj asdflkjha sdfk
              sadf jasdlkf asdklfjsaldk fjlsakd fjsak ldfjlsakd fas
              dfjsalkdjfla;skdjf l;askdj flka;s df asdflkj asdflkjsadlkf alsdkjf
              asdf sa dfas d fsjhglaskdjg asldkfjlaskdfjlask;djf ;laskdfj
            </Text>
          </Box>
        </Group>
        <Divider mb="xl" />
        <Flex gap={'md'} wrap={'wrap'}>
          {badges.map((badge) => (
            <Avatar key={badge} size={94} radius="sm">
              <IconBadge />
            </Avatar>
          ))}
        </Flex>
        <BadgeDrawer opened={createOpened} onClose={closeCreate} />
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
        </Stack>
      </Box>
    </Flex>
  );
};

const BadgeDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const theme = useMantineTheme();
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

  return (
    <PageDrawer opened={opened} onClose={onClose} closeOnBack>
      <Box mb="lg">
        <Text mb="lg" fz="lg" fw={600}>
          Create a Badge
        </Text>
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
        <Stack>
          <TextInput label="Badge Name" placeholder="Grant Ripper!" required />
          <Textarea
            autosize
            required
            minRows={4}
            label="Badge Description"
            placeholder="A description of the badge. What is it for? What are the rules for getting assigned this badge?"
          />
          <Radio.Group
            required
            defaultValue="nv"
            label="Fixed or Dynamic Value"
            description={`Will the value of the token be decided at the time awarding a badge, or is it fixed?`}
          >
            <Stack gap="sm" mt="sm">
              <Radio label="Fixed" value="nv" />
              <Radio label="Dynamic" value="v" />
            </Stack>
          </Radio.Group>
          <NumberInput
            label="Badge Award Amount"
            placeholder="Grant Ripper!"
            required
            hideControls={true}
          />
          <Radio.Group
            required
            defaultValue="nv"
            label="Badge Reward Token"
            description={`Will the tokens awarded be in voting token {} or non-voting token {}?`}
          >
            <Stack gap="sm" mt="sm">
              <Radio label="Award WARP Token" value="nv" />
              <Radio label="Award VOTEWARP Token" value="v" />
            </Stack>
          </Radio.Group>
          <Radio.Group
            required
            defaultValue="award"
            label="Award/Slash"
            description="Will this badge award a balance of token the recipient or will it slash."
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
