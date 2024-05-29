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
import {
  IconExclamationCircle,
  IconExternalLink,
  IconSquare,
  IconSquareCheck,
} from '@tabler/icons-react';
import { SCAN_URL } from '../../../constants/enpoints';
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

type FormValues = z.infer<typeof portfolioReportSchema>;

const defaultValues: FormValues = {
  roundReview: '',
  grantReviews: {},
};

export const PortfolioReport = ({
  shipId,
  shipHatId,
  reportStatus,
}: {
  shipHatId?: string | null;
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

  const form = useForm({
    initialValues: defaultValues,
    validate: zodResolver(portfolioReportSchema),
    validateInputOnBlur: true,
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
      {reportStatus === ReportStatus.Submit && (
        <ReportSubmitHeader grants={grants} formValues={form.values} />
      )}
      <Accordion defaultValue={grants[0].id} mb="lg">
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
                form={form}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
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
      {shipHatId && (
        <SubmitReport
          formValues={form.values}
          disabled={!form.isValid()}
          shipHatId={shipHatId}
          shipId={shipId}
        />
      )}
    </Box>
  );
};

const PortfolioItem = ({
  grant,
  reportStatus,
  form,
}: {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
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

        {reportStatus === ReportStatus.Submit && (
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
      </ul>
    </Box>
  );
};

const SubmitReport = ({
  formValues,
  shipId,
  shipHatId,
  disabled,
}: {
  formValues: FormValues;
  shipId: string;
  disabled: boolean;
  shipHatId: string;
}) => {
  const { tx } = useTx();
  const submitReport = async () => {
    if (disabled) {
      notifications.show({
        title: 'Error',
        message: 'Please fill out all required fields',
        color: 'red',
      });
    }

    const validated = portfolioReportSchema.safeParse(formValues);

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: 'Validation Error',
        color: 'red',
      });
    }

    const pinRes = await pinJSONToIPFS(formValues);

    const nonce = generateRandomBytes32();

    if (!pinRes) {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin report to IPFS',
        color: 'red',
      });
    }

    tx({
      writeContractParams: {
        abi: HatsPoster,
        address: ADDR.HATS_POSTER,
        functionName: 'postRecord',
        args: [
          `${Tag.ShipSubmitReport}-${shipId}`,
          nonce,
          shipHatId,
          [1n, pinRes.IpfsHash],
        ],
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
