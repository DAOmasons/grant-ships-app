import {
  Accordion,
  Avatar,
  Blockquote,
  Box,
  Group,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getShipGrants } from '../../../queries/getShipGrants';
import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../../constants/gameSetup';
import { IconExclamationCircle, IconExternalLink } from '@tabler/icons-react';
import { SCAN_URL } from '../../../constants/enpoints';
import { AppAlert } from '../../UnderContruction';
import { DashGrant } from '../../../resolvers/grantResolvers';
import { AlloStatus, ReportStatus } from '../../../types/common';
import { FacilitatorBadge, ShipBadge } from '../../RoleBadges';

export const PortfolioReport = ({
  shipId,
  reportStatus,
}: {
  shipId: string;
  reportStatus: ReportStatus;
}) => {
  const theme = useMantineTheme();

  const {
    data: grants,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`portfolio-${shipId}`],
    queryFn: () => getShipGrants(shipId as string),
    enabled: !!shipId,
  });

  if (isLoading)
    return (
      <Stack>
        <Skeleton height={300} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />2{' '}
      </Stack>
    );
  2;
  if (error || !grants)
    return (
      <AppAlert
        title="Error"
        icon={<IconExclamationCircle />}
        description={error?.message || 'Grant Data failed to load'}
        bg={theme.colors.pink[8]}
      />
    );

  if (grants.length === 0)
    return (
      <AppAlert
        title="No Grants"
        description={"This ship hasn't approved any grants yet."}
      />
    );

  return (
    <Box>
      <Accordion defaultValue={grants[0].id}>
        {grants.map((grant) => (
          <Accordion.Item key={grant.id} value={grant.id}>
            <Accordion.Control
              px="md"
              py="xs"
              icon={<Avatar src={grant.projectMetadata.imgUrl} size={32} />}
            >
              {grant.projectId.name} (
              {formatEther(grant.applicationData.grantAmount)}{' '}
              {GAME_TOKEN.SYMBOL})
            </Accordion.Control>
            <Accordion.Panel>
              <PortfolioItem grant={grant} reportStatus={reportStatus} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

const PortfolioItem = ({
  grant,
  reportStatus,
}: {
  grant: DashGrant;
  reportStatus: ReportStatus;
}) => {
  const theme = useMantineTheme();
  const completedMilestones = grant.milestones
    ? grant.milestones.filter(
        (ms) => ms.milestoneStatus === AlloStatus.Accepted
      ).length
    : [];

  const status =
    completedMilestones === grant.milestones?.length ? 'Completed' : 'Active';

  return (
    <Box>
      <Text fz="sm" className="ws-pre-wrap" mb="md">
        <Text component="span" fz="sm" fw={600}>
          Link To Project:{' '}
        </Text>
        <Text
          component={Link}
          to={`/project/${grant.projectId.id}`}
          target="_blank"
          fz={'sm'}
          rel="noopener noreferrer"
          td="underline"
        >
          {grant.projectId.name}
        </Text>
      </Text>
      <Text fz="sm" className="ws-pre-wrap" mb="md">
        <Text component="span" fz="sm" fw={600}>
          Status:{' '}
        </Text>
        {status}
      </Text>
      <Box mb="md">
        <Text fz="sm" mb="md" fw={600}>
          Receiving Address:{' '}
        </Text>
        <Text
          fz="sm"
          component="a"
          td="underline"
          href={`${SCAN_URL}/address/${grant.applicationData.receivingAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Group gap={4}>
            {grant.applicationData.receivingAddress}{' '}
            <IconExternalLink size={14} />
          </Group>
        </Text>
      </Box>
      <Text fz="sm" mb="md" fw={600}>
        Project Description
      </Text>
      <Text fz="sm" mb="md">
        {grant.projectMetadata.description}
      </Text>
      <Text fz="sm" mb="md" fw={600}>
        Grant Details
      </Text>
      <ul style={{ paddingLeft: '1.6rem' }}>
        <Text fz="sm">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Amount:{' '}
            </Text>
            {formatEther(grant.applicationData.grantAmount)} {GAME_TOKEN.SYMBOL}
          </li>
        </Text>
        <Text fz="sm">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Milestones:{' '}
            </Text>
            {completedMilestones}/{grant.milestones?.length} milestones
            completed
          </li>
        </Text>
        <Text fz="sm" className="ws-pre-wrap">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Reason for funding:{' '}
            </Text>
            <Blockquote
              p={'md'}
              color={theme.colors.violet[5]}
              my="md"
              icon={<ShipBadge />}
              iconSize={16}
            >
              {grant.shipApprovalReason}
            </Blockquote>
          </li>
        </Text>
        <Text fz="sm" className="ws-pre-wrap">
          <li>
            <Text component="span" fz="sm" fw={600}>
              Facilitator Approval Reason:{' '}
            </Text>
            <Blockquote
              p={'md'}
              my="md"
              color={theme.colors.pink[5]}
              icon={<FacilitatorBadge />}
              iconSize={18}
            >
              {grant.facilitatorReason}
            </Blockquote>
          </li>
        </Text>
        {reportStatus === ReportStatus.Review && (
          <Textarea
            label="Your Report"
            required
            autosize
            minRows={4}
            maxRows={8}
            description="How did the project go? What did you learn? What would you do differently next time?"
            placeholder="Type your report here..."
          />
        )}
      </ul>
    </Box>
  );
};
