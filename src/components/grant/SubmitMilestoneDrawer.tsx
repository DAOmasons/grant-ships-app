import React from 'react';
import { PageDrawer } from '../PageDrawer';
import {
  Box,
  Button,
  Center,
  Group,
  InputLabel,
  ScrollArea,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useGrant } from '../../hooks/useGrant';
import {
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconPennant,
} from '@tabler/icons-react';
import { GameStatus } from '../../types/common';
import { useInputState } from '@mantine/hooks';
import { formatEther } from 'viem';
import { secondsToLongDate } from '../../utils/time';
import { RTEditor } from '../RTEditor';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEditor } from '@tiptap/react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Player } from '../../types/ui';

export const SubmitMilestoneDrawer = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: { type: 'doc', content: [] },
  });

  const { project, currentMilestoneSet } = useGrant();
  const [milestoneId, setMilestoneId] = useInputState(
    currentMilestoneSet?.resolvedMilestones[0].id
  );
  const theme = useMantineTheme();

  const currentMilestone = currentMilestoneSet?.resolvedMilestones.find(
    (milestone) => milestone.id === milestoneId
  );

  return (
    <PageDrawer opened={opened} onClose={onClose}>
      <Group justify="space-between">
        <PlayerAvatar
          playerType={Player.Project}
          imgUrl={project?.metadata?.imgUrl}
          name={project?.name}
        />
        <Button>Submit Milestone</Button>
      </Group>
      <SegmentedControl
        mt={'md'}
        bg={theme.colors.dark[6]}
        mb={'lg'}
        size="xs"
        onChange={setMilestoneId}
        value={milestoneId || currentMilestoneSet?.resolvedMilestones[0].id}
        // orientation="vertical"
        data={
          currentMilestoneSet?.resolvedMilestones.map((milestone, index) => {
            return {
              value: milestone.id,
              label: (
                <Center style={{ gap: 8 }}>
                  {milestone.status === GameStatus.Accepted ? (
                    <IconCircleCheck color={theme.colors.green[6]} size={16} />
                  ) : milestone.status === GameStatus.Rejected ? (
                    <IconExclamationCircle
                      color={theme.colors.red[6]}
                      size={16}
                    />
                  ) : milestone.status === GameStatus.Pending ? (
                    <IconClock color={theme.colors.yellow[6]} size={16} />
                  ) : (
                    <IconPennant size={16} />
                  )}
                  <span style={{ fontWeight: 900 }}>Milestone {index + 1}</span>
                </Center>
              ),
            };
          })!
        }
      />
      {currentMilestone && (
        <Box>
          <Text fz="lg" fw={500} mb="md" opacity={0.9}>
            Milestone {currentMilestone.index + 1}
          </Text>

          <Stack>
            <Box>
              <Text fz="sm" fw={700} opacity={0.9}>
                Payment Percentage
              </Text>
              <Text fz="sm" opacity={0.9}>
                {Number(formatEther(currentMilestone.percentage)) * 100}%
              </Text>
            </Box>
            <Box>
              <Text fz="sm" fw={700} opacity={0.9}>
                Expected Delivery
              </Text>
              <Text fz="sm" opacity={0.9}>
                {secondsToLongDate(currentMilestone.milestoneContent.date)}
              </Text>
            </Box>
            <Box>
              <Text fz="sm" fw={700} opacity={0.9}>
                Description
              </Text>
              <Text fz="sm" opacity={0.9}>
                {currentMilestone.milestoneContent.milestoneDetails}
              </Text>
            </Box>
            <InputLabel>Comments</InputLabel>
            <RTEditor editor={editor} noHeading />
          </Stack>
        </Box>
      )}
    </PageDrawer>
  );
};
