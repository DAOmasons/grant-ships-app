import { Box, Flex, Group, Stack, Tabs, Text } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { ShipDashCard } from '../components/dashboard/ShipDashCard';
import { GameStatus } from '../types/common';
import classes from '../components/dashboard/dashboard.module.css';
import { IconCheck } from '@tabler/icons-react';
import { ComponentProps, ReactNode, useMemo } from 'react';

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
  const gameStatusNumber = 0;
  const steps = useMemo((): VerticalStepContent[] => {
    return [
      {
        title: 'Applications',
        description: '1 Ship Approved',
      },
      {
        title: 'Create Game Round',
        description: 'Not Yet Started',
      },
      {
        title: 'Allocate',
        description: 'Not yet allocated',
      },
      {
        title: 'Distribute',
        description: 'Not yet distributed',
      },
      {
        title: 'Start Game',
        description: 'Game Round is not yet started',
      },
      {
        title: 'End Game',
        description: 'Game is not yet Active',
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
        <Flex className={leftBorderClasses} mb={'sm'}>
          {content}
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
