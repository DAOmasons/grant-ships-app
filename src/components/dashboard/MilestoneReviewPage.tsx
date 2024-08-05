// import { ReactNode, useState } from 'react';
// import { useAccount } from 'wagmi';
// import { isAddress } from 'viem';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import {
//   Box,
//   Flex,
//   Skeleton,
//   Stack,
//   Text,
//   Textarea,
//   useMantineTheme,
// } from '@mantine/core';
// import { notifications } from '@mantine/notifications';
// import { IconCheck } from '@tabler/icons-react';
// import { IconX } from '@tabler/icons-react';

// import { ReviewPage } from '../../layout/ReviewPage';
// import { DashGrant, PackedMilestoneData } from '../../resolvers/grantResolvers';
// import { useTx } from '../../hooks/useTx';
// import { pinJSONToIPFS } from '../../utils/ipfs/pin';
// import { AlloStatus, GrantStatus } from '../../types/common';
// import { AppAlert } from '../UnderContruction';
// import GrantShipAbi from '../../abi/GrantShip.json';
// import { getIpfsJson } from '../../utils/ipfs/get';
// import { MilestoneTimeline } from './MilestoneTimeline';
// import { TxButton } from '../TxButton';
// import { MilestoneBuilder } from './MilestonesBuilder';

// export type UnpackedMilestoneData = PackedMilestoneData & {
//   milestoneDetails: string | null;
//   date: number | null;
// };

// const resolveMilestoneMetadata = async (milestone: PackedMilestoneData) => {
//   const res = await getIpfsJson(milestone.metadata.pointer);

//   return {
//     ...milestone,
//     milestoneDetails: res?.milestoneDetails || null,
//     date: res?.date || null,
//   };
// };

// const unpackMilestones = async (milestones: PackedMilestoneData[]) => {
//   const unpackedMilestones = await Promise.all(
//     milestones.map((milestone) => resolveMilestoneMetadata(milestone))
//   );
//   return unpackedMilestones;
// };

// export const MilestoneReviewPage = ({
//   grant,
//   opened,
//   isShipOperator,
//   isProjectMember,
//   handleClose,
//   view,
// }: {
//   view: 'project-page' | 'ship-dash';
//   grant: DashGrant;
//   opened: boolean;
//   isShipOperator?: boolean;
//   isProjectMember?: boolean;
//   handleClose: () => void;
// }) => {
//   const {
//     data: milestones,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: [`grant-${grant.id}-milestones`],
//     queryFn: () => unpackMilestones(grant.milestones as PackedMilestoneData[]),
//     enabled: !!grant.milestones && opened,
//   });

//   const { address } = useAccount();
//   const { tx } = useTx();
//   const theme = useMantineTheme();
//   const queryClient = useQueryClient();
//   const [reasonText, setReasonText] = useState('');
//   const [isPinning, setIsPinning] = useState(false);

//   const reviewMilestones = async (isApproved: boolean) => {
//     try {
//       setIsPinning(true);
//       if (!isAddress(grant.shipId.shipContractAddress)) {
//         console.error('Invalid Ship Address');
//         return;
//       }

//       const pinRes = await pinJSONToIPFS({
//         reason: reasonText,
//         reviewer: address as string,
//       });

//       if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
//         notifications.show({
//           title: 'IPFS Upload Error',
//           message: pinRes.IpfsHash[1],
//           color: 'red',
//         });
//         return;
//       }
//       setIsPinning(true);
//       handleClose();

//       tx({
//         writeContractParams: {
//           abi: GrantShipAbi,
//           address: grant.shipId.shipContractAddress,
//           functionName: 'reviewSetMilestones',
//           args: [
//             grant.projectId.id,
//             isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
//             [1n, pinRes.IpfsHash],
//           ],
//         },
//         onComplete() {
//           if (view === 'project-page') {
//             queryClient.invalidateQueries({
//               queryKey: [`project-grants-${grant.projectId.id}`],
//             });
//           }
//           if (view === 'ship-dash') {
//             queryClient.invalidateQueries({
//               queryKey: [`ship-dash-${grant.shipId.id}`],
//             });
//           }
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       notifications.show({
//         title: 'Error',
//         message: 'Error submitting application',
//         color: 'red',
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <Layout>
//         <Stack>
//           <Skeleton height={200} w="100%" />
//           <Skeleton height={200} w="100%" />
//           <Skeleton height={200} w="100%" />
//           <Skeleton height={200} w="100%" />
//         </Stack>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <AppAlert
//           title="Error"
//           description={
//             error?.message || 'An error occurred while fetching milestones'
//           }
//         />
//       </Layout>
//     );
//   }

//   if (!milestones) {
//     return (
//       <Layout>
//         <AppAlert
//           title="Error"
//           description={
//             "No milestones found. This is likely an error with the grant's data. Please contact support."
//           }
//         />
//       </Layout>
//     );
//   }

//   if (
//     grant.grantStatus === GrantStatus.MilestonesRejected ||
//     grant.grantStatus === GrantStatus.MilestonesApproved
//   ) {
//     const reasonDisplay =
//       grant.grantStatus === GrantStatus.MilestonesApproved ? (
//         <Layout>
//           <AppAlert
//             mt={0}
//             mb={'xl'}
//             icon={<IconCheck />}
//             title="Milestones Approved"
//             description={`"${grant.milestonesApprovedReason}"`}
//             bg={theme.colors.blue[8]}
//           />
//         </Layout>
//       ) : (
//         <Layout>
//           <AppAlert
//             mt={0}
//             mb={'xl'}
//             icon={<IconX />}
//             title="Milestones Rejected"
//             description={`"${grant.milestonesApprovedReason}"`}
//             bg={theme.colors.red[6]}
//           />
//           {isProjectMember && view === 'project-page' && (
//             <MilestoneBuilder
//               grant={grant}
//               close={handleClose}
//               isResubmitting
//             />
//           )}
//         </Layout>
//       );

//     return (
//       <ReviewPage
//         title="Grant Milestones"
//         sections={[
//           'DIVIDER',
//           {
//             subtitle: ' ',
//             content: (
//               <MilestoneTimeline
//                 close={handleClose}
//                 milestones={milestones}
//                 grant={grant}
//                 view={view}
//                 isShipOperator={isShipOperator}
//                 isProjectMember={isProjectMember}
//               />
//             ),
//           },
//         ]}
//         footerSection={reasonDisplay}
//       />
//     );
//   }

//   if (
//     view === 'ship-dash' &&
//     isShipOperator &&
//     grant.grantStatus === GrantStatus.MilestonesProposed
//   ) {
//     return (
//       <ReviewPage
//         title="Grant Milestones"
//         sections={[
//           'DIVIDER',
//           {
//             subtitle: ' ',
//             content: (
//               <MilestoneTimeline
//                 close={handleClose}
//                 milestones={milestones}
//                 grant={grant}
//                 view={view}
//                 isShipOperator={isShipOperator}
//                 isProjectMember={isProjectMember}
//               />
//             ),
//           },
//         ]}
//         footerSection={
//           <>
//             <Text mb="md" fw={600}>
//               Approve or Reject Milestones
//             </Text>
//             <Textarea
//               label="Reasoning"
//               description="Why are you approving or rejecting these Milestones?"
//               value={reasonText}
//               onChange={(e) => setReasonText(e.currentTarget.value)}
//               autosize
//               fw={400}
//               required
//               minRows={4}
//               maxRows={8}
//               mb="xl"
//             />
//             <Flex justify="space-between">
//               <TxButton
//                 size="sm"
//                 variant="light"
//                 loading={isPinning}
//                 onClick={() => reviewMilestones(false)}
//               >
//                 Reject
//               </TxButton>
//               <TxButton
//                 size="sm"
//                 onClick={() => reviewMilestones(true)}
//                 loading={isPinning}
//               >
//                 Approve
//               </TxButton>
//             </Flex>
//           </>
//         }
//       />
//     );
//   }

//   return (
//     <ReviewPage
//       title="Grant Milestones"
//       sections={[
//         'DIVIDER',
//         {
//           subtitle: ' ',
//           content: (
//             <MilestoneTimeline
//               close={handleClose}
//               milestones={milestones}
//               grant={grant}
//               view={view}
//               isShipOperator={isShipOperator}
//               isProjectMember={isProjectMember}
//             />
//           ),
//         },
//       ]}
//     />
//   );
// };

// const Layout = ({ children }: { children: ReactNode }) => {
//   return (
//     <Flex justify={'center'} w="100%" h={'90vh'}>
//       <Box maw={600} miw={300} p="xl" fw={700} w="100%">
//         {children}
//       </Box>
//     </Flex>
//   );
// };
