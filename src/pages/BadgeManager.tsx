import { useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  ActionIcon,
  Avatar,
  Box,
  FileButton,
  InputLabel,
  NumberInput,
  Radio,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons-react';
import { getGatewayUrl } from '../utils/ipfs/get';
import { pinFileToIPFS } from '../utils/ipfs/pin';

export const BadgeManager = () => {
  return (
    <MainSection>
      <PageTitle title="Badge Manager" />

      <Tabs defaultValue="create">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
          <Tabs.Tab value="minter">Minter</Tabs.Tab>
          <Tabs.Tab value="create">Create</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="manager">
          <Manager />
        </Tabs.Panel>
        <Tabs.Panel value="mint">
          <Minter />
        </Tabs.Panel>
        <Tabs.Panel value="create">
          <Create />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const Create = () => {
  const [isLoading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');
  const theme = useMantineTheme();

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

  const avatarPreview = ipfsHash ? getGatewayUrl(ipfsHash) : null;
  const canPreview = avatarPreview && !isLoading;
  return (
    <Box>
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
  );
};

const Manager = () => {
  return <></>;
};
const Minter = () => {
  return <></>;
};
