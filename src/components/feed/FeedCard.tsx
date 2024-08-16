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
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Address, formatEther } from 'viem';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../../utils/config';
import { mainnet } from 'viem/chains';
import { FeedCardUI, Player } from '../../types/ui';
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
import { useElementSize, useIntersection } from '@mantine/hooks';
import { IconAward } from '@tabler/icons-react';
import { PlayerAvatar } from '../PlayerAvatar';
import { Content } from '@tiptap/react';
import { RTDisplay } from '../RTDisplay';

const hoverCardProps: HoverCardProps = {
  position: 'bottom-start',
  width: 280,
  openDelay: 300,
  closeDelay: 300,
  transitionProps: { transition: 'fade', duration: 300 },
};

const getUrlByEntityType = (playerType: Player, entityId: string) => {
  if (playerType === Player.Project) {
    return `/project/${entityId}`;
  }
  if (playerType === Player.Ship) {
    return `/ship/${entityId}`;
  }
  if (playerType === Player.Facilitators) {
    return `/facilitators`;
  }
  return '';
};

function replaceTextWithComponents(
  message: string,
  entities: {
    name: string;
    id: string;
    playerType: Player;
  }[]
) {
  let elements: ReactNode[] = [message];

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
                to={getUrlByEntityType(entity.playerType, entity.id)}
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

const replaceWei = (message: string) => {
  const regex = /##IN-WEI(\d+)##/g;

  const matches = message.matchAll(regex);

  if (!matches) {
    return message;
  }

  return message.replace(regex, (match, amount) => {
    return `${formatEther(BigInt(amount))} ${GAME_TOKEN.SYMBOL}`;
  });
};

export const FeedCard = ({
  subject,
  object,
  message,
  embedText,
  tag,
  timestamp,
  sender,
  cardIndex,
  cardCount,
  onIntersect,
  richTextContent,
  internalLink,
  externalLink,
  limitHeight = false,
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

  const formattedFeedMessage = useMemo(() => {
    if (!message) return '';

    return replaceTextWithComponents(
      replaceWei(message || ''),
      object ? [subject, object] : [subject]
    );
  }, [message, subject, object]);

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

  const entityUrl = getUrlByEntityType(subject.playerType, subject.id);

  const Inner = (
    <>
      <Group gap={8}>
        <HoverCard {...hoverCardProps}>
          <HoverCard.Target>
            <Box>
              <PlayerAvatar
                playerType={subject.playerType}
                imgUrl={subject.imgUrl}
                name={subject.name}
              />
            </Box>
          </HoverCard.Target>
          <HoverCard.Dropdown style={{ border: 'none' }}>
            <HoverCardContent subject={subject} url={entityUrl} />
          </HoverCard.Dropdown>
        </HoverCard>
        <Text size="sm" opacity={0.8}>
          ·
        </Text>
        <Text size="sm" opacity={0.8}>
          {time}
        </Text>
      </Group>
      <Box pl={48} pb={'lg'}>
        <Box mb="sm">
          {formattedFeedMessage && (
            <Text
              size="sm"
              mb={10}
              className="ws-pre-wrap"
              opacity={richTextContent ? 0.8 : 0.9}
            >
              {formattedFeedMessage}
            </Text>
          )}
          {richTextContent && (
            <RichTextDisplay
              limitHeight={limitHeight}
              content={richTextContent}
              internalLink={internalLink}
              externalLink={externalLink}
            />
          )}
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
        </Box>
        <Text size="xs" opacity={0.7}>
          Posted by{' '}
          {ensName ? ensName : sender.slice(0, 6) + '...' + sender.slice(-4)}
        </Text>
      </Box>
      <Divider />
    </>
  );

  if (internalLink) {
    return (
      <Box pt={'lg'} pos="relative">
        <Box ref={observer.ref} style={{ textDecoration: 'none' }}>
          <Link
            to={internalLink}
            style={{
              textDecoration: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 1,
            }}
          />
          {Inner}
        </Box>
      </Box>
    );
  }

  if (externalLink) {
    return (
      <Box pt={'lg'} style={{ textDecoration: 'none', position: 'relative' }}>
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
        />
        <Box ref={observer.ref}>{Inner}</Box>
      </Box>
    );
  }

  return (
    <Box pt={'lg'} ref={observer.ref}>
      {Inner}
    </Box>
  );
};

const RichTextDisplay = ({
  content,
  maxHeight = 350,
  internalLink,
  limitHeight,
  externalLink,
}: {
  content: Content;
  maxHeight?: number;
  limitHeight: boolean;
  internalLink?: string;
  externalLink?: string;
}) => {
  const { ref, height } = useElementSize();
  const [isMaxHeight, setIsMaxHeight] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (height >= maxHeight && limitHeight) {
      setIsMaxHeight(true);
    }
  }, [height]);

  const readMoreLink = useMemo(() => {
    if (internalLink) {
      return (
        <Text
          fz="sm"
          fw={500}
          c={theme.colors.blue[4]}
          component={Link}
          to={internalLink}
          className={classes.readMore}
        >
          Read More
        </Text>
      );
    }
    if (externalLink) {
      return (
        <Text
          fz="sm"
          fw={500}
          c={theme.colors.blue[4]}
          component={'a'}
          href={externalLink}
          rel="noreferrer"
          target="_blank"
          className={classes.readMore}
        >
          Read More
        </Text>
      );
    }
  }, [internalLink, externalLink]);

  return (
    <Box className={classes.richTextDisplay} ref={ref}>
      <RTDisplay minified content={content} />
      {isMaxHeight && <Box className={classes.fade}></Box>}
      {isMaxHeight && readMoreLink}
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
    if (subject.playerType === Player.Project) {
      return (
        <Group gap={8} mb="sm">
          <IconAward size={20} color={theme.colors.blue[5]} />
          <Text c={theme.colors.blue[5]}>Project</Text>
        </Group>
      );
    }
    if (subject.playerType === Player.Ship) {
      return (
        <Group gap={8} mb="sm">
          <IconRocket size={20} color={theme.colors.violet[5]} />
          <Text c={theme.colors.violet[5]}>Grant Ship</Text>
        </Group>
      );
    }
    if (subject.playerType === Player.Facilitators) {
      return (
        <Group gap={8} mb="sm">
          <IconShieldHalf size={20} color={theme.colors.pink[5]} />
          <Text c={theme.colors.pink[5]}>Facilitator</Text>
        </Group>
      );
    }
  }, [subject.playerType, theme]);

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
