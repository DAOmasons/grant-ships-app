import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  HoverCard,
  HoverCardProps,
  Spoiler,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { Address, formatEther } from 'viem';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../../utils/config';
import { mainnet } from 'viem/chains';
import { FeedCardUI } from '../../types/ui';
import {
  IconChevronDown,
  IconChevronUp,
  IconRocket,
  IconShieldHalf,
} from '@tabler/icons-react';
import classes from './FeedStyles.module.css';
import { secondsToShortRelativeTime } from '../../utils/time';
import { Link } from 'react-router-dom';
import { GAME_TOKEN } from '../../constants/gameSetup';
import { useIntersection } from '@mantine/hooks';
import { FacilitatorBadge, ProjectBadge, ShipBadge } from '../RoleBadges';
import { IconAward } from '@tabler/icons-react';

const hoverCardProps: HoverCardProps = {
  position: 'bottom-start',
  width: 280,
  openDelay: 300,
  closeDelay: 300,
  transitionProps: { transition: 'fade', duration: 300 },
};

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
  cardIndex,
  cardCount,
  onIntersect,
}: FeedCardUI & {
  cardIndex: number;
  cardCount: number;
  onIntersect?: () => void;
}) => {
  const observer = useIntersection({
    root: null,
    threshold: 1,
  });

  const hasFetchedMore = useRef(false);
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
      return <ProjectBadge />;
    }
    if (subject.entityType === 'ship') {
      return <ShipBadge />;
    }
    if (subject.entityType === 'facilitators') {
      return <FacilitatorBadge />;
    }
  }, [subject.entityType]);

  const time = useMemo(() => {
    return secondsToShortRelativeTime(timestamp);
  }, [timestamp]);

  const shouldFetch = cardIndex === cardCount - 1;
  useEffect(
    () => {
      if (observer.entry?.isIntersecting && onIntersect) {
        if (shouldFetch && !hasFetchedMore.current) {
          onIntersect?.();
          hasFetchedMore.current = true;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [observer, cardCount, cardIndex, shouldFetch]
  );

  const entityUrl = getUrlByEntityType(subject.entityType, subject.id);

  return (
    <Box mb="lg" ref={observer.ref}>
      <Flex mb="lg">
        <Box mr="xs">
          <HoverCard {...hoverCardProps}>
            <HoverCard.Target>
              <Avatar
                size={32}
                src={subject.imgUrl && subject.imgUrl}
                component={Link}
                to={entityUrl}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ border: 'none' }}>
              <HoverCardContent subject={subject} url={entityUrl} />
            </HoverCard.Dropdown>
          </HoverCard>
        </Box>
        <Box w="100%">
          <Group gap={8} mb={8}>
            <HoverCard {...hoverCardProps}>
              <HoverCard.Target>
                <Text size="sm" component={Link} to={entityUrl}>
                  {subject.name}
                </Text>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ border: 'none' }}>
                <HoverCardContent subject={subject} url={entityUrl} />
              </HoverCard.Dropdown>
            </HoverCard>
            {icon}
            <Text size="sm" opacity={0.8}>
              ·
            </Text>

            <Text size="sm" opacity={0.8}>
              {time}
            </Text>
          </Group>
          <Text size="sm" mb={10} className="ws-pre-wrap">
            {formattedFeedContent}
          </Text>
          {embedText && (
            <Spoiler
              mb={'xs'}
              hideLabel={<IconChevronUp stroke={1} />}
              showLabel={<IconChevronDown stroke={1} />}
              classNames={{
                root: classes.embedTextBox,
                control: classes.embedTextControl,
              }}
              maxHeight={48}
            >
              <Text fz="sm" className="ws-pre-wrap">
                {embedText}
              </Text>
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

export const HoverCardContent = ({
  subject,
  url,
}: {
  subject: FeedCardUI['subject'];
  url: string;
}) => {
  const theme = useMantineTheme();

  const roleDisplay = useMemo(() => {
    if (subject.entityType === 'project') {
      return (
        <Group gap={8} mb="sm">
          <IconAward size={20} color={theme.colors.blue[5]} />
          <Text c={theme.colors.blue[5]}>Project</Text>
        </Group>
      );
    }
    if (subject.entityType === 'ship') {
      return (
        <Group gap={8} mb="sm">
          <IconRocket size={20} color={theme.colors.violet[5]} />
          <Text c={theme.colors.violet[5]}>Grant Ship</Text>
        </Group>
      );
    }
    if (subject.entityType === 'facilitators') {
      return (
        <Group gap={8} mb="sm">
          <IconShieldHalf size={20} color={theme.colors.pink[5]} />
          <Text c={theme.colors.pink[5]}>Facilitator</Text>
        </Group>
      );
    }
  }, [subject.entityType, theme]);

  return (
    <Box w="100%" p="xs">
      <Flex justify="space-between">
        <Avatar size={64} mb="xs" src={subject.imgUrl && subject.imgUrl} />
        <Button size="xs" component={Link} to={url}>
          View
        </Button>
      </Flex>
      <Text size="lg" mb={4} fw={600}>
        {subject.name}
      </Text>

      {roleDisplay}
      <Text size="sm" lineClamp={2}>
        {subject.description}
      </Text>
    </Box>
  );
};
