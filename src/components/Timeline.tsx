import {
  Box,
  Divider,
  Flex,
  Group,
  Spoiler,
  SpoilerProps,
  Text,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ComponentProps, ReactNode } from 'react';
import classes from './timeline.module.css';

export type TimelineProps = {
  steps: TimelineContent[];
  subKey: string;
  currentNumber: number;
  containerProps?: ComponentProps<typeof Flex>;
};

export type TimelineContent = Pick<
  TimelineBoxProps,
  'title' | 'description' | 'content'
>;

export type TimelineBoxProps = {
  title: string;
  description?: string;
  currentNumber: number;
  stepNumber: number;
  last?: boolean;
  content?: ReactNode;
  foo?: SpoilerProps;
};

export const Timeline = ({
  steps,
  subKey,
  currentNumber,
  containerProps = {},
}: TimelineProps) => {
  return (
    <Flex direction="column" {...containerProps}>
      {steps.map((step, index) => (
        <TimelineBox
          key={`${subKey}-${index}`}
          {...step}
          stepNumber={index}
          currentNumber={currentNumber}
          last={index === steps.length - 1}
        />
      ))}
    </Flex>
  );
};

export const TimelineBox = ({
  title,
  description,
  currentNumber,
  stepNumber,
  last,
  content,
}: TimelineBoxProps) => {
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
