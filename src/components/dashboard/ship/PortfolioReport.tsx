import {
  Accordion,
  Avatar,
  Blockquote,
  Box,
  Group,
  Skeleton,
  Spoiler,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../../feed/FeedStyles.module.css';

import { formatEther } from 'viem';
import { GAME_TOKEN } from '../../../constants/gameSetup';
import {
  IconChevronDown,
  IconChevronUp,
  IconExclamationCircle,
  IconSquare,
  IconSquareCheck,
} from '@tabler/icons-react';
import { AppAlert } from '../../UnderContruction';
import { DashGrant } from '../../../resolvers/grantResolvers';
import { AlloStatus, ReportStatus } from '../../../types/common';
import { FacilitatorBadge, ShipBadge } from '../../RoleBadges';
import { UseFormReturnType, useForm, zodResolver } from '@mantine/form';
import { portfolioReportSchema } from '../../forms/validationSchemas/portfolioReportSchema';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { useTx } from '../../../hooks/useTx';
import HatsPoster from '../../../abi/HatsPoster.json';
import { ADDR } from '../../../constants/addresses';
import { Tag } from '../../../constants/tags';
import { generateRandomBytes32 } from '../../../utils/helpers';
import { TxButton } from '../../TxButton';
import { MilestoneProgress } from '../../projectItems/MilestoneProgress';

type FormValues = z.infer<typeof portfolioReportSchema>;

const defaultValues: FormValues = {
  roundReview: '',
  grantReviews: {},
};

type ReportData = {
  roundReview: string;
  grantReviews: Record<string, string>;
};

export const PortfolioReport = ({
  shipId,
  grants,
  shipHatId,
  reportStatus,
  isLoading,
  error,
  onReportSubmit,
  reportData,
}: {
  grants?: DashGrant[] | null;
  isLoading: boolean;
  error: Error | null;
  shipHatId?: string | null;
  shipId: string;
  reportStatus: ReportStatus;
  onReportSubmit?: () => void;
  reportData?: ReportData | null;
}) => {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: defaultValues,
    validate: zodResolver(portfolioReportSchema),
    validateInputOnBlur: true,
  });

  if (isLoading)
    return (
      <Stack>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Stack>
    );

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

  const shipName = grants?.[0]?.shipMetadata?.name;
  const shipAvatar = grants?.[0]?.shipMetadata?.imgUrl;

  return (
    <Box>
      {reportStatus === ReportStatus.Submit && (
        <ReportSubmitHeader grants={grants} formValues={form.values} />
      )}

      <Accordion mb="lg">
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
              <PortfolioItem
                grant={grant}
                reportStatus={reportStatus}
                reportData={reportData}
                form={form}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      {reportData &&
        (reportStatus === ReportStatus.Review ||
          reportStatus === ReportStatus.Vote) && (
          <>
            <Group align="center" mb="md" gap="xs">
              <Text fz="sm" fw={600}>
                Round Summary from {shipName}
              </Text>
              <Avatar src={shipAvatar} size={16} />
            </Group>
            <ReviewBox text={reportData.roundReview} />
          </>
        )}
      {shipHatId && reportStatus === ReportStatus.Submit && (
        <>
          <Textarea
            label="Season Report Summary"
            required
            autosize
            minRows={4}
            maxRows={8}
            description="How did your first round of Grant Ships go? How do you feel about your allocation strategy? What worked well? What didn't?"
            placeholder="Explain here..."
            {...form.getInputProps(`roundReview`)}
            mb="xl"
          />
          <SubmitReport
            formValues={form.values}
            disabled={!form.isValid()}
            shipHatId={shipHatId}
            shipId={shipId}
            onReportSubmit={onReportSubmit}
          />
        </>
      )}
    </Box>
  );
};

const ReviewBox = ({ text }: { text: string }) => {
  return (
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
        {text}
      </Text>
    </Spoiler>
  );
};

const PortfolioItem = ({
  grant,
  reportStatus,
  form,
  reportData,
}: {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  grant: DashGrant;
  reportStatus: ReportStatus;
  reportData?: ReportData | null;
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
      <MilestoneProgress grant={grant} onlyMilestones />
      <Text fz="sm" className="ws-pre-wrap" mb="md" mt="md">
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
      <Box mb="md"></Box>
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
            className="ws-pre-wrap"
            fz="sm"
          >
            {grant.shipApprovalReason}
          </Blockquote>
        </li>

        <li>
          <Text component="span" fz="sm" fw={600}>
            Facilitator Approval Reason:{' '}
          </Text>
        </li>
        <Blockquote
          p={'md'}
          my="md"
          color={theme.colors.pink[5]}
          icon={<FacilitatorBadge />}
          iconSize={18}
          fz="sm"
          className="ws-pre-wrap"
        >
          {grant.facilitatorReason}
        </Blockquote>

        {(reportStatus === ReportStatus.Submit ||
          reportStatus === ReportStatus.Vote) && (
          <Textarea
            label="Your Report"
            required
            autosize
            minRows={4}
            maxRows={8}
            description="How did the project go? What did you learn? What would you do differently next time?"
            placeholder="Type your report here..."
            {...form.getInputProps(`grantReviews.${grant.id}`)}
          />
        )}

        {reportStatus === ReportStatus.Review && reportData && (
          <>
            <Group align="center" mb="md" gap="xs">
              <Text fz="sm" fw={600}>
                Review from {grant.shipMetadata.name}
              </Text>
              <Avatar src={grant.shipMetadata.imgUrl} size={16} />
            </Group>
            <ReviewBox text={reportData.grantReviews[grant.id]} />
          </>
        )}
      </ul>
    </Box>
  );
};

const SubmitReport = ({
  formValues,
  shipId,
  shipHatId,
  disabled,
  onReportSubmit,
}: {
  formValues: FormValues;
  shipId: string;
  disabled: boolean;
  shipHatId: string;
  onReportSubmit?: () => void;
}) => {
  const { tx } = useTx();
  const submitReport = async () => {
    if (disabled) {
      notifications.show({
        title: 'Error',
        message: 'Please fill out all required fields',
        color: 'red',
      });
      return;
    }

    const validated = portfolioReportSchema.safeParse(formValues);

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: 'Validation Error',
        color: 'red',
      });
      return;
    }

    const pinRes = await pinJSONToIPFS(formValues);

    const nonce = generateRandomBytes32();

    if (!pinRes) {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin report to IPFS',
        color: 'red',
      });
      return;
    }

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: HatsPoster,
        address: ADDR.HATS_POSTER,
        functionName: 'postRecord',
        args: [
          `${Tag.ShipSubmitReport}-${ADDR.VOTE_CONTEST}-${shipId}`,
          nonce,
          shipHatId,
          [1n, pinRes.IpfsHash],
        ],
      },
      writeContractOptions: {
        onPollSuccess() {
          onReportSubmit?.();
        },
      },
    });
  };

  return (
    <Group justify="flex-end">
      <TxButton disabled={disabled} onClick={submitReport}>
        Submit Report
      </TxButton>
    </Group>
  );
};

const ReportSubmitHeader = ({
  grants,
  formValues,
}: {
  grants: DashGrant[];
  formValues: FormValues;
}) => {
  const theme = useMantineTheme();
  return (
    <>
      <Text fz="lg" mb="lg" fw={600}>
        Your Portfolio Report
      </Text>
      <Box>
        <Text fz="sm" mb="md" fs="italic">
          Please provide a summary of each grant that you issued in the list.
          Also submit a round summary the bottom of the page
        </Text>
        <Box mb="md">
          <Group gap="xs" mb="sm">
            <Text component="span" fz="sm" fw={600}>
              Round Review:{' '}
            </Text>
            {formValues.roundReview ? (
              <IconSquareCheck size={16} color={theme.colors.teal[5]} />
            ) : (
              <IconSquare size={16} />
            )}
          </Group>
          <Group gap="xs">
            <Text component="span" fz="sm" fw={600}>
              Grant Reviews:{' '}
            </Text>
            {grants.map((g) =>
              formValues?.grantReviews[g.id] ? (
                <IconSquareCheck
                  key={g.id}
                  size={16}
                  color={theme.colors.teal[5]}
                />
              ) : (
                <IconSquare key={g.id} size={16} />
              )
            )}
          </Group>
        </Box>
      </Box>
    </>
  );
};
