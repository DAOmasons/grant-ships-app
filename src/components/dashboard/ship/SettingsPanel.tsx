import { Box, Button, Divider, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBuildingLighthouse,
  IconChartBar,
  IconFileDescription,
  IconPlus,
} from '@tabler/icons-react';
import { PageDrawer } from '../../PageDrawer';
import { PlayerAvatar } from '../../PlayerAvatar';
import { TxButton } from '../../TxButton';
import { Player } from '../../../types/ui';
import { RTEditor } from '../../RTEditor';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export const SettingsPanel = ({
  beacon,
  customApplication,
  shipSrcAddress,
  shipAvatar,
  shipName,
}: {
  shipSrcAddress?: string;
  shipAvatar?: string;
  shipName?: string;
  beacon?: string;
  customApplication?: string;
}) => {
  const [beaconOpen, { close: closeBeacon, open: openBeacon }] =
    useDisclosure();
  const [applicationOpen, { close: closeApplication, open: openApplication }] =
    useDisclosure();

  const hasLoaded = shipSrcAddress && shipAvatar && shipName;

  return (
    <Box>
      <Group mb="sm">
        <IconBuildingLighthouse size={24} />
        <Text fz="lg" fw={600}>
          Beacon Message
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        This message will be displayed whenever a project starts a new grant
        with you. In the future, it will also be displayed when you approach
        projects to apply for a grant.
      </Text>
      {hasLoaded ? (
        <Button mb="lg" leftSection={<IconBuildingLighthouse />}>
          Manage Beacon
        </Button>
      ) : (
        <Button mb="lg" leftSection={<IconBuildingLighthouse />} disabled>
          Manage Beacon
        </Button>
      )}
      <Divider mb="lg" />
      <Group mb="sm">
        <IconFileDescription size={24} />
        <Text fz="lg" fw={600}>
          Custom Application
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        Create a template grant application form to collect the information you
        need.
      </Text>
      {hasLoaded ? (
        <Button mb="lg" leftSection={<IconFileDescription />}>
          Manage Application
        </Button>
      ) : (
        <Button mb="lg" leftSection={<IconFileDescription />} disabled>
          Manage Application
        </Button>
      )}
      <Divider mb="lg" />
      <Group mb="sm">
        <IconChartBar size={24} />
        <Text fz="lg" fw={600}>
          Portfolio Report
        </Text>
      </Group>
      <Text fz="sm" mb="md">
        Reflect on the round and share your learnings with the community.
        Comment on each project and share a video summary of the round.
      </Text>
      {hasLoaded ? (
        <Button mb="lg" leftSection={<IconChartBar />} disabled>
          Manage Report
        </Button>
      ) : (
        <Button mb="lg" leftSection={<IconChartBar />} disabled>
          Manage Report
        </Button>
      )}
      <Divider mb="lg" />
    </Box>
  );
};

const BeaconDrawer = ({
  opened,
  onClose,
  shipAvatar,
  shipName,
  shipSrcAddress,
  content = { type: 'doc', content: [] },
}: {
  shipSrcAddress: string;
  shipAvatar: string;
  shipName: string;
  opened: boolean;
  onClose: () => void;
  content?: Content;
}) => {
  const postId = `beacon-${shipSrcAddress}`;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    onUpdate({ editor }) {
      const newContent = editor.getJSON();
      localStorage.setItem(postId, JSON.stringify(newContent));
    },
    content,
  });

  return (
    <PageDrawer pageTitle="Beacon Message" opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Ship}
          imgUrl={shipAvatar}
          name={shipName}
        />
        <Group gap="sm">
          <TxButton leftSection={<IconPlus />} onClick={() => {}}>
            Post
          </TxButton>
        </Group>
        <RTEditor editor={editor} />
      </Group>
    </PageDrawer>
  );
};

const ApplicationDrawer = ({
  opened,
  onClose,
  shipAvatar,
  shipName,
  shipSrcAddress,
  content = { type: 'doc', content: [] },
}: {
  shipSrcAddress: string;
  shipAvatar: string;
  shipName: string;
  opened: boolean;
  onClose: () => void;
  content?: Content;
}) => {
  const postId = `custom-application-${shipSrcAddress}`;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    onUpdate({ editor }) {
      const newContent = editor.getJSON();
      localStorage.setItem(postId, JSON.stringify(newContent));
    },
    content,
  });

  return (
    <PageDrawer
      pageTitle="Custom Application"
      opened={opened}
      onClose={onClose}
    >
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Ship}
          imgUrl={shipAvatar}
          name={shipName}
        />
        <Group gap="sm">
          <TxButton leftSection={<IconPlus />} onClick={() => {}}>
            Post
          </TxButton>
        </Group>
        <RTEditor editor={editor} />
      </Group>
    </PageDrawer>
  );
};
