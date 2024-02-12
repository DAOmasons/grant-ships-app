import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { IconExternalLink } from '@tabler/icons-react';
import { FundingIndicator } from '../components/shipItems/FundingIndicator';
import { FeedCardUI } from '../types/ui';
import { Feed } from '../components/feed/Feed';

export const Ship = () => {
  const theme = useMantineTheme();

  return (
    <Flex>
      <MainSection maw={534}>
        <PageTitle title="Ship 1" />
        <Avatar size={160} mt={'xl'} mb="md" />
        <Text fz="lg" fw={600}>
          Ship 1
        </Text>
        <Text mb="xs">Approved</Text>
        <Text fz="sm" mb={'md'}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Group mb="xl" justify="space-between">
          <Avatar.Group>
            <Avatar size={36} src="https://i.pravatar.cc/300" />
            <Avatar size={36} src="https://i.pravatar.cc/301" />
            <Avatar size={36} src="https://i.pravatar.cc/302" />
            <Avatar size={36} src="https://i.pravatar.cc/302" />
          </Avatar.Group>
          <Button size="md">Apply for Funding</Button>
        </Group>
        <Tabs defaultValue="feed">
          <Tabs.List mb={'xl'}>
            <Tabs.Tab value="feed" w="20%">
              Feed
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="details">
              Details
            </Tabs.Tab>
            <Tabs.Tab w="20%" value="contact">
              Contact
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="feed">
            <FeedPanel />
          </Tabs.Panel>
          <Tabs.Panel value="details">
            <DetailsPanel />
          </Tabs.Panel>
          <Tabs.Panel value="contact">
            <ContactPanel />
          </Tabs.Panel>
        </Tabs>
      </MainSection>
      <Stack mt={72} w={270}>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Group>
            <Text size="sm">Ship Model: </Text>
            <a href="#">
              <Group>
                <Text fz="sm" mr={-10}>
                  Grant Ship Alpha
                </Text>
                <IconExternalLink
                  size={16}
                  style={{ transform: 'translateY(-1px)' }}
                />
              </Group>
            </a>
          </Group>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Received
          </Text>
          <Text size="xl">0 ARB</Text>
        </Paper>
        <Paper p="md" bg={theme.colors.dark[6]}>
          <Text size="sm" mb="lg">
            Funding Available
          </Text>
          <FundingIndicator amounts={[30, 20, 50]} />
        </Paper>
      </Stack>
    </Flex>
  );
};

const DummyFeed: FeedCardUI[] = [
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
    embedText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen...",
  },

  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
];

const FeedPanel = () => {
  return <Feed feed={DummyFeed} />;
};

const DetailsPanel = () => {
  return <div>Details</div>;
};

const ContactPanel = () => {
  return <div>Contact</div>;
};
