import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Spoiler,
  SpoilerProps,
  Stack,
  Tabs,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { ShipDashCard } from '../components/dashboard/ShipDashCard';
import { GameStatus } from '../types/common';
import classes from '../components/dashboard/dashboard.module.css';
import { IconCheck } from '@tabler/icons-react';
import { ComponentProps, ReactNode, useMemo } from 'react';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';
import { SHIP_AMOUNT } from '../constants/gameSetup';

export const FacilitatorDashboard = () => {
  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="hats">Hats</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">
          <FacilitatorGameDash />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const FacilitatorGameDash = () => {
  const gameStatusNumber = 3;

  const theme = useMantineTheme();
  const steps = useMemo((): VerticalStepContent[] => {
    return [
      {
        title: 'Applications',
        description: `1/${SHIP_AMOUNT} Ships Approved`,
        content: (
          <Box>
            <Stack>
              <Button
                variant="default"
                size="sm"
                leftSection={<Avatar size={32} />}
              >
                <Text fz="sm">King Ship</Text>
              </Button>
              <Button
                variant="default"
                size="sm"
                leftSection={<Avatar size={32} />}
              >
                <Text fz="sm">King Ship</Text>
              </Button>
              <Button
                variant="default"
                size="sm"
                leftSection={<Avatar size={32} />}
              >
                <Text fz="sm">King Ship</Text>
              </Button>
            </Stack>
          </Box>
        ),
      },
      {
        title: 'Create Game Round',
        description: 'Not Yet Started',
        content: <Button>Create Game Round</Button>,
      },
      {
        title: 'Allocate',
        description: 'Not yet allocated',
        content: (
          <Box>
            <TextInput label="Ship 1" w={350} placeholder="22.5 ETH" mb="xs" />
            <TextInput label="Ship 2" w={350} placeholder="22.5 ETH" mb="xs" />
            <TextInput label="Ship 3" w={350} placeholder="22.5 ETH" mb="xs" />
            <Button>Allocate</Button>
          </Box>
        ),
      },
      {
        title: 'Distribute',
        description: 'Not yet distributed',
        content: (
          <Box>
            <DateTimePicker label="Start Time" w={350} mb={'md'} />
            <DateTimePicker label="End Time" w={350} mb="md" />
            <Button>Distribute Allocations</Button>
          </Box>
        ),
      },
      {
        title: 'Start Game',
        description: 'Game Round is not yet started',
        content: <Button>Start Game</Button>,
      },
      {
        title: 'End Game',
        description: 'Game is not yet Active',
        content: <Button>End Game</Button>,
      },
      {
        title: 'Game Complete',
        description: 'Game is not yet complete',
      },
    ];
  }, []);

  return (
    <Flex direction="column">
      <VerticalStatus
        key="game-manager"
        steps={steps}
        currentNumber={gameStatusNumber}
        containerProps={{ w: '100%' }}
      />
    </Flex>
  );
};

type VerticalStatusProps = {
  steps: VerticalStepContent[];
  key: string;
  currentNumber: number;
  containerProps?: ComponentProps<typeof Flex>;
};

const VerticalStatus = ({
  steps,
  key,
  currentNumber,
  containerProps = {},
}: VerticalStatusProps) => {
  return (
    <Flex direction="column" {...containerProps}>
      {steps.map((step, index) => (
        <VerticalStatusBox
          key={`${key}-${index}`}
          {...step}
          stepNumber={index}
          currentNumber={currentNumber}
          last={index === steps.length - 1}
        />
      ))}
    </Flex>
  );
};

type VerticalStepContent = Pick<
  VerticalStatusBoxProps,
  'title' | 'description' | 'content'
>;

type VerticalStatusBoxProps = {
  title: string;
  description?: string;
  currentNumber: number;
  stepNumber: number;
  last?: boolean;
  content?: ReactNode;
  foo?: SpoilerProps;
};
const VerticalStatusBox = ({
  title,
  description,
  currentNumber,
  stepNumber,
  last,
  content,
}: VerticalStatusBoxProps) => {
  const isStepCompleted = stepNumber < currentNumber;
  const isStepActive = stepNumber === currentNumber;
  const isUpcoming = stepNumber > currentNumber;

  const leftBorderClasses = `${classes.statusContentBox} ${isUpcoming ? classes.statusContentBoxNotActive : ''}`;

  const statusIconBorder = () => {
    if (isStepCompleted) {
      return `${classes.statusIcon} ${classes.statusIconSolid} `;
    }
    if (isStepActive) {
      return classes.statusIcon;
    }
    if (isUpcoming) {
      return `${classes.statusIcon} ${classes.statusIconInactive}`;
    }
  };

  return (
    <Box>
      <Group mb="sm">
        <Flex className={statusIconBorder()}>
          {!isStepCompleted ? (
            <Text size="sm">{stepNumber + 1}</Text>
          ) : (
            <IconCheck size={16} />
          )}
        </Flex>
        <Box>
          <Text fw={500}>{title}</Text>
          <Text size="xs" opacity={0.5}>
            {description}
          </Text>
        </Box>
      </Group>
      {!last && (
        <Flex className={leftBorderClasses} mb={'sm'} px={'xl'} pt="md" pb={0}>
          <Spoiler
            maxHeight={0}
            showLabel={<Text fz="sm">Expand</Text>}
            hideLabel={<Text fz="sm">Collapse</Text>}
            pb={'md'}
            initialState={isStepActive}
          >
            <Box
              opacity={isUpcoming || isStepCompleted ? 0.5 : 1}
              style={{ cursor: isUpcoming ? 'not-allowed' : 'default' }}
            >
              {content}
            </Box>
          </Spoiler>
          <Divider />
        </Flex>
      )}
    </Box>
  );
};

export const FacilitatorShipDash = () => {
  return (
    <Stack gap="xl">
      <Stack>
        <Text fw={500}>Open Applications (3)</Text>
        <ShipDashCard
          name="Public Goods Deathstar"
          lastUpdate="1 day ago"
          shipStatus={GameStatus.Pending}
        />
        <ShipDashCard
          name="Money Beam"
          lastUpdate="3 days ago"
          shipStatus={GameStatus.Pending}
        />
        <ShipDashCard
          name="Warp 3"
          lastUpdate="4 hours ago"
          shipStatus={GameStatus.Pending}
        />
      </Stack>
      <Stack>
        <Text fw={500}>Accepted Applications (1)</Text>
        <ShipDashCard
          name="Prince Perfact"
          lastUpdate="1 day ago"
          shipStatus={GameStatus.Accepted}
        />
      </Stack>
      <Stack>
        <Text fw={500}>Rejected Applications (2)</Text>
        <ShipDashCard
          name="Scams Enterprise"
          shipStatus={GameStatus.Rejected}
        />
        <ShipDashCard
          name="Nigerian Prince Sweepstakes"
          shipStatus={GameStatus.Rejected}
        />
      </Stack>
    </Stack>
  );
};
