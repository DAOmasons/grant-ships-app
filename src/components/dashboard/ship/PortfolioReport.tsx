// import {
//   Accordion,
//   Avatar,
//   Box,
//   Group,
//   Skeleton,
//   Spoiler,
//   Stack,
//   Text,
//   TextInput,
//   Textarea,
//   useMantineTheme,
// } from '@mantine/core';
// import { Link } from 'react-router-dom';
// import classes from '../../feed/FeedStyles.module.css';

// import { formatEther } from 'viem';
// import { GAME_TOKEN } from '../../../constants/gameSetup';
// import {
//   IconChevronDown,
//   IconChevronUp,
//   IconExternalLink,
//   IconSquare,
//   IconSquareCheck,
// } from '@tabler/icons-react';
// import { AppAlert } from '../../UnderContruction';
// import { DashGrant } from '../../../resolvers/grantResolvers';
// import { AlloStatus, ReportStatus } from '../../../types/common';
// import { ShipBadge } from '../../RoleBadges';
// import { UseFormReturnType, useForm, zodResolver } from '@mantine/form';
// import { portfolioReportSchema } from '../../forms/validationSchemas/portfolioReportSchema';
// import { z } from 'zod';
// import { notifications } from '@mantine/notifications';
// import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
// import { useTx } from '../../../hooks/useTx';
// import HatsPoster from '../../../abi/HatsPoster.json';
// import { ADDR } from '../../../constants/addresses';
// import { Tag } from '../../../constants/tags';
// import { generateRandomBytes32 } from '../../../utils/helpers';
// import { TxButton } from '../../TxButton';
// import { MilestoneProgress } from '../../projectItems/MilestoneProgress';

// type FormValues = z.infer<typeof portfolioReportSchema>;

// const defaultValues: FormValues = {
//   roundReview: '',
//   grantReviews: {},
//   grantDemos: {},
//   grantExtras: {},
// };

// type ReportData = {
//   roundReview: string;
//   grantReviews: Record<string, string>;
//   grantDemos: Record<string, string>;
//   grantExtras: Record<string, string>;
// };

// export const PortfolioReport = ({
//   shipId,
//   grants,
//   shipHatId,
//   reportStatus,
//   isLoading,
//   error,
//   onReportSubmit,
//   reportData,
// }: {
//   grants?: DashGrant[] | null;
//   isLoading: boolean;
//   error: Error | null;
//   shipHatId?: string | null;
//   shipId: string;
//   reportStatus: ReportStatus;
//   onReportSubmit?: () => void;
//   reportData?: ReportData | null;
// }) => {
//   const form = useForm({
//     initialValues: defaultValues,
//     validate: zodResolver(portfolioReportSchema),
//     validateInputOnBlur: true,
//   });

//   if (isLoading)
//     return (
//       <Stack>
//         <Skeleton height={50} />
//         <Skeleton height={50} />
//         <Skeleton height={50} />
//       </Stack>
//     );

//   if (error || !grants) return null;

//   if (grants.length === 0)
//     return (
//       <AppAlert
//         title="No Grants"
//         description={"This ship hasn't approved any grants yet."}
//       />
//     );

//   const shipName = grants?.[0]?.shipMetadata?.name;
//   const shipAvatar = grants?.[0]?.shipMetadata?.imgUrl;

//   return (
//     <Box>
//       {reportStatus === ReportStatus.Submit && (
//         <ReportSubmitHeader grants={grants} formValues={form.values} />
//       )}
//       {reportData &&
//         (reportStatus === ReportStatus.Review ||
//           reportStatus === ReportStatus.Vote) && (
//           <Box mb="xl">
//             <Group gap={4} mb="sm" align="center">
//               <ShipBadge />
//               <Text fz="md" fw={600}>
//                 Operator's Summary:
//               </Text>
//             </Group>
//             <ReviewBox
//               text={reportData.roundReview}
//               from={{
//                 label: shipName,
//                 avatarUrl: shipAvatar,
//               }}
//             />
//           </Box>
//         )}
//       <Text fz="md" fw={600} mb="xs">
//         Funded Projects
//       </Text>
//       <Accordion mb="lg">
//         {grants.map((grant) => (
//           <Accordion.Item key={grant.id} value={grant.id}>
//             <Accordion.Control
//               px="md"
//               py="xs"
//               icon={<Avatar src={grant.projectMetadata.imgUrl} size={32} />}
//             >
//               {grant.projectId.name} (
//               {formatEther(grant.applicationData.grantAmount)}{' '}
//               {GAME_TOKEN.SYMBOL})
//             </Accordion.Control>
//             <Accordion.Panel>
//               <PortfolioItem
//                 grant={grant}
//                 reportStatus={reportStatus}
//                 reportData={reportData}
//                 form={form}
//               />
//             </Accordion.Panel>
//           </Accordion.Item>
//         ))}
//       </Accordion>

//       {shipHatId && reportStatus === ReportStatus.Submit && (
//         <>
//           <Textarea
//             label="Season Report Summary"
//             required
//             autosize
//             minRows={4}
//             maxRows={8}
//             description="How did your first round of Grant Ships go? How do you feel about your allocation strategy? What worked well? What didn't?"
//             placeholder="Explain here..."
//             {...form.getInputProps(`roundReview`)}
//             mb="xl"
//           />
//           <SubmitReport
//             formValues={form.values}
//             disabled={!form.isValid()}
//             shipHatId={shipHatId}
//             shipId={shipId}
//             onReportSubmit={onReportSubmit}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// const ReviewBox = ({
//   text,
//   from,
// }: {
//   text: string;
//   from?: { label: string; avatarUrl: string };
// }) => {
//   return (
//     <Spoiler
//       mb={'xs'}
//       hideLabel={<IconChevronUp stroke={1} />}
//       showLabel={<IconChevronDown stroke={1} />}
//       classNames={{
//         root: classes.embedTextBox,
//         control: classes.embedTextControl,
//       }}
//       maxHeight={68}
//     >
//       {from && (
//         <Group gap={6} mb="xs" align="center">
//           <Avatar src={from?.avatarUrl} size={16} />
//           <Text fz="sm">{from.label}</Text>
//         </Group>
//       )}
//       <Text fz="sm" className="ws-pre-wrap">
//         {text}
//       </Text>
//     </Spoiler>
//   );
// };

// const PortfolioItem = ({
//   grant,
//   reportStatus,
//   form,
//   reportData,
// }: {
//   form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
//   grant: DashGrant;
//   reportStatus: ReportStatus;
//   reportData?: ReportData | null;
// }) => {
//   const completedMilestones = grant.milestones
//     ? grant.milestones.filter(
//         (ms) => ms.milestoneStatus === AlloStatus.Accepted
//       ).length
//     : [];

//   const status =
//     completedMilestones === grant.milestones?.length ? 'Completed' : 'Active';
//   const demoLink = reportData?.grantDemos?.[grant.id];

//   const extraLink = reportData?.grantExtras?.[grant.id];
//   return (
//     <Box px="sm">
//       <Text fz="sm" className="ws-pre-wrap" mb="md">
//         <Text component="span" fz="sm" fw={600}>
//           Grant Status:{' '}
//         </Text>
//         {status}
//       </Text>
//       <Text fz="sm" mb="4" fw={600}>
//         Description:
//       </Text>
//       <Text fz="sm" mb="md">
//         {grant.projectMetadata.description}
//       </Text>
//       <Text fz="sm" mb="xs" fw={600}>
//         Milestones Completed:
//       </Text>
//       <Box mb="lg">
//         <MilestoneProgress grant={grant} onlyMilestones />
//       </Box>
//       {(reportStatus === ReportStatus.Submit ||
//         reportStatus === ReportStatus.Vote) && (
//         <Box>
//           <Textarea
//             label="Your Report"
//             required
//             autosize
//             minRows={4}
//             maxRows={8}
//             mb={'sm'}
//             description="How did the project go? What did you learn? What would you do differently next time?"
//             placeholder="Type your report here..."
//             {...form.getInputProps(`grantReviews.${grant.id}`)}
//           />
//           <TextInput
//             mb="sm"
//             label="Demo Link"
//             description="Optional. If you have a demo link, please provide it here."
//             placeholder="https://app.grantships.fun/"
//             {...form.getInputProps(`grantDemos.${grant.id}`)}
//             value={form.values.grantDemos[grant.id] || ''}
//           />
//           <TextInput
//             label="Extra Link"
//             description="Optional. If you have any additional links or resources, please provide them here."
//             placeholder="https://app.grantships.fun/"
//             {...form.getInputProps(`grantExtras.${grant.id}`)}
//             value={form.values.grantExtras[grant.id] || ''}
//           />
//         </Box>
//       )}

//       {reportStatus === ReportStatus.Review && reportData && (
//         <>
//           <Group mb="sm" gap={4}>
//             <ShipBadge />
//             <Text fz="sm" fw={600}>
//               Ship Operator summary:
//             </Text>
//           </Group>
//           <ReviewBox
//             text={reportData.grantReviews[grant.id]}
//             from={{
//               label: grant.shipMetadata.name,
//               avatarUrl: grant.shipMetadata.imgUrl,
//             }}
//           />
//           <Text fz="sm" mb="xs" fw={600} mt="md">
//             Links:
//           </Text>
//           <Group mb="md" align="center" gap={4}>
//             <Text
//               component={Link}
//               to={`/project/${grant.projectId.id}`}
//               target="_blank"
//               fz={'sm'}
//               rel="noopener noreferrer"
//               td="underline"
//             >
//               Project
//             </Text>
//             <IconExternalLink size={16} />
//           </Group>
//           {demoLink && (
//             <Group mb="md" align="center" gap={4}>
//               <Text
//                 component="a"
//                 href={demoLink}
//                 target="_blank"
//                 fz={'sm'}
//                 rel="noopener noreferrer"
//                 td="underline"
//               >
//                 Demo
//               </Text>
//               <IconExternalLink size={16} />
//               <Text fz="sm" lineClamp={1} w={250} opacity={0.5}>
//                 ({demoLink})
//               </Text>
//             </Group>
//           )}
//           {extraLink && (
//             <Group mb="md" align="center" gap={4}>
//               <Text
//                 component="a"
//                 href={extraLink}
//                 target="_blank"
//                 fz={'sm'}
//                 rel="noopener noreferrer"
//                 td="underline"
//               >
//                 Extra
//               </Text>
//               <IconExternalLink size={16} />
//               <Text fz="sm" lineClamp={1} w={250} opacity={0.5}>
//                 ({extraLink})
//               </Text>
//             </Group>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// const SubmitReport = ({
//   formValues,
//   shipId,
//   shipHatId,
//   disabled,
//   onReportSubmit,
// }: {
//   formValues: FormValues;
//   shipId: string;
//   disabled: boolean;
//   shipHatId: string;
//   onReportSubmit?: () => void;
// }) => {
//   const { tx } = useTx();
//   const submitReport = async () => {
//     if (disabled) {
//       notifications.show({
//         title: 'Error',
//         message: 'Please fill out all required fields',
//         color: 'red',
//       });
//       return;
//     }

//     const validated = portfolioReportSchema.safeParse(formValues);

//     if (!validated.success) {
//       notifications.show({
//         title: 'Error',
//         message: 'Validation Error',
//         color: 'red',
//       });
//       return;
//     }

//     const pinRes = await pinJSONToIPFS(validated.data);

//     const nonce = generateRandomBytes32();

//     if (!pinRes) {
//       notifications.show({
//         title: 'Error',
//         message: 'Failed to pin report to IPFS',
//         color: 'red',
//       });
//       return;
//     }

//     tx({
//       viewParams: {
//         awaitEnvioPoll: true,
//       },
//       writeContractParams: {
//         abi: HatsPoster,
//         address: ADDR.HATS_POSTER,
//         functionName: 'postRecord',
//         args: [
//           `${Tag.ShipSubmitReport}-${ADDR.VOTE_CONTEST}-${shipId}`,
//           nonce,
//           shipHatId,
//           [1n, pinRes.IpfsHash],
//         ],
//       },
//       writeContractOptions: {
//         onPollSuccess() {
//           onReportSubmit?.();
//         },
//       },
//     });
//   };

//   return (
//     <Group justify="flex-end">
//       <TxButton disabled={disabled} onClick={submitReport}>
//         Submit Report
//       </TxButton>
//     </Group>
//   );
// };

// const ReportSubmitHeader = ({
//   grants,
//   formValues,
// }: {
//   grants: DashGrant[];
//   formValues: FormValues;
// }) => {
//   const theme = useMantineTheme();
//   return (
//     <>
//       <Text fz="lg" mb="lg" fw={600}>
//         Your Portfolio Report
//       </Text>
//       <Box>
//         <Text fz="sm" mb="md" fs="italic">
//           Please provide a summary of each grant that you issued in the list.
//           Also submit a round summary the bottom of the page
//         </Text>
//         <Box mb="md">
//           <Group gap="xs" mb="sm">
//             <Text component="span" fz="sm" fw={600}>
//               Round Review:{' '}
//             </Text>
//             {formValues.roundReview ? (
//               <IconSquareCheck size={16} color={theme.colors.teal[5]} />
//             ) : (
//               <IconSquare size={16} />
//             )}
//           </Group>
//           <Group gap="xs">
//             <Text component="span" fz="sm" fw={600}>
//               Grant Reviews:{' '}
//             </Text>
//             {grants.map((g) =>
//               formValues?.grantReviews[g.id] ? (
//                 <IconSquareCheck
//                   key={g.id}
//                   size={16}
//                   color={theme.colors.teal[5]}
//                 />
//               ) : (
//                 <IconSquare key={g.id} size={16} />
//               )
//             )}
//           </Group>
//         </Box>
//       </Box>
//     </>
//   );
// };
