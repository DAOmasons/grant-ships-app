import { Box, Button, Divider, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChartBar,
  IconFileDescription,
  IconMessage,
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
import { useTx } from '../../../hooks/useTx';
import { notifications } from '@mantine/notifications';
import { tiptapContentSchema } from '../../forms/validationSchemas/tiptap';
import ShipAbi from '../../../abi/GrantShip.json';
import { Address } from 'viem';
import { Tag } from '../../../constants/tags';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { ZER0_ADDRESS } from '../../../constants/gameSetup';
import {
  beaconNotSubmitted,
  defaultApplication,
} from '../../../constants/copy';

export const SettingsPanel = ({
  beacon,
  customApplication,
  shipSrcAddress,
  shipAvatar,
  shipName,
  refetch,
}: {
  shipSrcAddress?: string;
  shipAvatar?: string;
  shipName?: string;
  beacon?: Content;
  customApplication?: string;
  refetch?: () => void;
}) => {
  const [beaconOpen, { close: closeBeacon, open: openBeacon }] =
    useDisclosure();
  const [applicationOpen, { close: closeApplication, open: openApplication }] =
    useDisclosure();

  const hasLoaded = shipSrcAddress && shipAvatar && shipName;
  return (
    <>
      <Box>
        <Group mb="sm">
          <IconMessage size={24} />
          <Text fz="lg" fw={600}>
            Welcome Message
          </Text>
        </Group>
        <Text fz="sm" mb="md">
          This message will be displayed whenever a project starts a new grant
          with you.
        </Text>
        {hasLoaded ? (
          <Button mb="lg" onClick={openBeacon}>
            Manage Message
          </Button>
        ) : (
          <Button mb="lg" disabled>
            Manage Message
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
          Create a template grant application form to collect the information
          you need.
        </Text>
        {hasLoaded ? (
          <Button mb="lg" onClick={openApplication}>
            Manage Application
          </Button>
        ) : (
          <Button mb="lg" disabled>
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
          <Button mb="lg" disabled>
            Manage Report
          </Button>
        ) : (
          <Button mb="lg" disabled>
            Manage Report
          </Button>
        )}
        <Divider mb="lg" />
      </Box>
      {hasLoaded && (
        <BeaconDrawer
          key={JSON.stringify(beacon || beaconNotSubmitted)}
          opened={beaconOpen}
          onClose={closeBeacon}
          shipSrcAddress={shipSrcAddress}
          shipName={shipName}
          shipAvatar={shipAvatar}
          content={beacon || beaconNotSubmitted}
        />
      )}
      {hasLoaded && (
        <ApplicationDrawer
          key={JSON.stringify(customApplication || defaultApplication)}
          shipName={shipName}
          shipAvatar={shipAvatar}
          shipSrcAddress={shipSrcAddress}
          opened={applicationOpen}
          onClose={closeApplication}
          content={customApplication || defaultApplication}
        />
      )}
    </>
  );
};

const BeaconDrawer = ({
  opened,
  onClose,
  shipAvatar,
  shipName,
  shipSrcAddress,
  content,
  refetch,
}: {
  shipSrcAddress: string;
  shipAvatar: string;
  shipName: string;
  opened: boolean;
  onClose: () => void;
  content?: Content;
  refetch?: () => void;
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

  const { tx } = useTx();

  const handleBeaconPost = async () => {
    if (!shipSrcAddress) {
      notifications.show({
        title: 'Error',
        message: 'Ship address is missing',
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

    const rtMetadata = tiptapContentSchema.safeParse(editor.getJSON());

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

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'postUpdate',
        address: shipSrcAddress as Address,
        args: [Tag.ShipBeacon, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
      },
      writeContractOptions: {
        onPollSuccess() {
          localStorage.removeItem(postId);
          refetch?.();
        },
      },
    });
  };

  return (
    <PageDrawer pageTitle="Beacon Message" opened={opened} onClose={onClose}>
      <Group mt="40" mb="lg" w="100%" justify="space-between">
        <PlayerAvatar
          playerType={Player.Ship}
          imgUrl={shipAvatar}
          name={shipName}
        />
        <TxButton leftSection={<IconPlus />} onClick={handleBeaconPost}>
          Post
        </TxButton>
      </Group>
      <RTEditor editor={editor} />
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

  const { tx } = useTx();

  const handlePost = async () => {
    if (!shipSrcAddress) {
      notifications.show({
        title: 'Error',
        message: 'Ship address is missing',
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

    const validated = tiptapContentSchema.safeParse(editor.getJSON());

    if (!validated.success) {
      notifications.show({
        title: 'Validation Error',
        message: "Application text doesn't match the schema",
        color: 'red',
      });

      return;
    }

    onClose();
    const pinRes = await pinJSONToIPFS(validated.data);

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'postUpdate',
        address: shipSrcAddress as Address,
        args: [Tag.ShipApplication, [1n, pinRes.IpfsHash], ZER0_ADDRESS],
      },
    });
  };

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
        <TxButton leftSection={<IconPlus />} onClick={handlePost}>
          Post
        </TxButton>
      </Group>
      <RTEditor editor={editor} />
    </PageDrawer>
  );
};
