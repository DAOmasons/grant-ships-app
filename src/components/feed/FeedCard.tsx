import {
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Spoiler,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import { Address, formatEther } from 'viem';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../../utils/config';
import { mainnet } from 'viem/chains';
import { FeedCardUI } from '../../types/ui';
import {
  IconAward,
  IconChevronCompactDown,
  IconChevronCompactUp,
  IconRocket,
} from '@tabler/icons-react';
import classes from './FeedStyles.module.css';
import { secondsToShortRelativeTime } from '../../utils/time';
import { Link } from 'react-router-dom';
import { GAME_TOKEN } from '../../constants/gameSetup';

const getUrlByEntityType = (entityType: string, entityId: string) => {
  if (entityType === 'project') {
    return `/project/${entityId}`;
  }
  if (entityType === 'ship') {
    return `/ship/${entityId}`;
  }
  if (entityType === 'facilitators') {
    return `/facilitators`;
  }
  return '';
};

function replaceTextWithComponents(
  content: string,
  entities: {
    name: string;
    id: string;
    entityType: string;
  }[]
) {
  let elements: ReactNode[] = [content];

  entities.forEach((entity) => {
    const newElements: ReactNode[] = [];
    elements.forEach((element) => {
      if (typeof element === 'string') {
        // Split the string by the entity name to get an array of strings.
        // For each part, insert the Link component before adding the next part.
        const parts = element.split(entity.name);
        parts.forEach((part, index) => {
          newElements.push(part);
          if (index < parts.length - 1) {
            // Don't add a Link after the last part
            newElements.push(
              <Link
                key={`${entity.id}-${index}`}
                to={getUrlByEntityType(entity.entityType, entity.id)}
                style={{ color: 'inherit' }}
              >
                {entity.name}
              </Link>
            );
          }
        });
      } else {
        // If the element is not a string (e.g., already a JSX element), just keep it.
        newElements.push(element);
      }
    });
    elements = newElements;
  });

  return elements;
}

const replaceWei = (content: string) => {
  const regex = /##IN-WEI(\d+)##/g;

  const matches = content.matchAll(regex);

  if (!matches) {
    return content;
  }

  return content.replace(regex, (match, amount) => {
    return `${formatEther(BigInt(amount))} ${GAME_TOKEN.SYMBOL}`;
  });
};

export const FeedCard = ({
  subject,
  object,
  content,
  embedText,
  timestamp,
  sender,
}: FeedCardUI) => {
  const theme = useMantineTheme();
  const { data: ensName } = useEnsName({
    address: sender as Address,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const formattedFeedContent = useMemo(() => {
    return replaceTextWithComponents(
      replaceWei(content),
      object ? [subject, object] : [subject]
    );
  }, [content, subject, object]);

  const icon = useMemo(() => {
    if (subject.entityType === 'project') {
      return <IconAward size={16} color={theme.colors.blue[5]} />;
    }
    if (subject.entityType === 'ship') {
      return <IconRocket size={16} color={theme.colors.violet[5]} />;
    }
    if (subject.entityType === 'facilitators') {
      return <IconAward size={16} color={theme.colors.pink[5]} />;
    }
  }, [subject.entityType, theme]);

  const time = useMemo(() => {
    return secondsToShortRelativeTime(timestamp);
  }, [timestamp]);

  return (
    <Box mb="lg">
      <Flex mb="lg">
        <Box mr="xs">
          <Avatar size={32} src={subject.imgUrl && subject.imgUrl} />
        </Box>
        <Box>
          <Group gap={8} mb={8}>
            <Text size="sm">{subject.name}</Text>
            {icon}
            <Text size="sm" opacity={0.8}>
              ·
            </Text>
            <Text size="sm" opacity={0.8}>
              {time}
            </Text>
          </Group>
          <Text size="sm" mb={10}>
            {formattedFeedContent}
          </Text>
          {embedText && (
            <Spoiler
              mb={'xs'}
              hideLabel={<IconChevronCompactUp />}
              showLabel={<IconChevronCompactDown />}
              classNames={{
                root: classes.embedTextBox,
                control: classes.embedTextControl,
              }}
              maxHeight={48}
            >
              <Text fz="sm">{embedText}</Text>
            </Spoiler>
          )}
          <Text size="xs" opacity={0.85}>
            Posted by{' '}
            {ensName ? ensName : sender.slice(0, 6) + '...' + sender.slice(-4)}
          </Text>
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};
