import {
  Group,
  Loader,
  Spoiler,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCheck,
  IconCircleX,
  IconExclamationCircle,
  IconUfo,
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import classes from './txModalStyles.module.css';
import { SCAN_URL } from '../../../constants/enpoints';

export const LoadingState = ({
  title,
  description,
  txHash,
}: {
  title?: string;
  description?: string;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" mt={-14} pb={'xl'}>
      <Loader type="ring" style={{ width: '8rem', height: '8rem' }} />
      <Text size="lg">{title}</Text>
      <Text size="sm" c={theme.colors.dark[2]}>
        {description}
      </Text>
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          href={`${SCAN_URL}/tx/${txHash}`}
          target="_blank"
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};

export const SuccessState = ({
  title,
  description,
  ctaElement,
  txHash,
}: {
  title?: string;
  description?: string;
  ctaElement?: ReactNode;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" pb={'xl'}>
      <div className={classes.ufo}>
        <IconUfo size={80} color={theme.colors.blue[4]} />
      </div>
      <Group gap={6}>
        <Text size="lg">{title}</Text>
        <IconCheck size={24} />
      </Group>
      <Text size="sm" c={theme.colors.dark[2]}>
        {description}
      </Text>
      {ctaElement}
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          href={`${SCAN_URL}/tx/${txHash}`}
          rel="noopener noreferrer"
          target="_blank"
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};

export const ErrorState = ({
  title,
  description,
  txHash,
}: {
  title?: string;
  description?: string;
  txHash?: string;
}) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" pb={'xl'}>
      <IconCircleX size={80} color={theme.colors.red[4]} />
      <Text size="lg" mb={'xs'}>
        {title}
      </Text>
      <Spoiler
        maxHeight={80}
        showLabel={<Text size="xs">Show More</Text>}
        hideLabel={<Text size="xs">Show More</Text>}
        mx="lg"
      >
        <Text
          size="sm"
          c={theme.colors.dark[2]}
          // lineClamp={4}
          style={{ wordBreak: 'break-word' }}
        >
          <Text span fw={700}>
            Error Message:{' '}
          </Text>{' '}
          {description}
        </Text>
      </Spoiler>
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          target="_blank"
          href={`${SCAN_URL}/tx/${txHash}`}
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};

export const TimeoutState = ({ txHash }: { txHash?: string }) => {
  const theme = useMantineTheme();
  return (
    <Stack align="center" pb={'xl'}>
      <IconExclamationCircle size={80} color={theme.colors.violet[6]} />
      <Text size="lg" mb={'xs'}>
        Subgraph Lagging
      </Text>
      <Spoiler
        maxHeight={80}
        showLabel={<Text size="xs">Show More</Text>}
        hideLabel={<Text size="xs">Show More</Text>}
        mx="lg"
      >
        <Text
          size="sm"
          c={theme.colors.dark[2]}
          style={{ wordBreak: 'break-word' }}
        >
          The Subgraph poll has timed out. Your transaction is successful,
          however there may be a delay in updating the UI.
        </Text>
      </Spoiler>
      {txHash && (
        <Text
          component={'a'}
          size="sm"
          rel="noopener noreferrer"
          target="_blank"
          href={`${SCAN_URL}/tx/${txHash}`}
          td="underline"
          style={{ cursor: 'pointer' }}
          c={theme.colors.dark[3]}
        >
          View on Etherscan
        </Text>
      )}
    </Stack>
  );
};
