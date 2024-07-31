// import { useDisclosure } from '@mantine/hooks';
// import { useTx } from '../../../hooks/useTx';
// import { useState } from 'react';
// import { AlloStatus, GrantStatus } from '../../../types/common';
// import { notifications } from '@mantine/notifications';
// import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
// import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
// import AlloAbi from '../../../abi/Allo.json';
// import { ReviewPage } from '../../../layout/ReviewPage';
// import {
//   Button,
//   Flex,
//   Group,
//   Modal,
//   Text,
//   Textarea,
//   Tooltip,
//   useMantineTheme,
// } from '@mantine/core';
// import { TxButton } from '../../TxButton';
// import { secondsToLongDateTime } from '../../../utils/time';
// import { ADDR } from '../../../constants/addresses';
// import { DashGrant } from '../../../resolvers/grantResolvers';
// import { GAME_TOKEN } from '../../../constants/gameSetup';
// import { IconCheck, IconExclamationCircle, IconX } from '@tabler/icons-react';
// import { AppAlert } from '../../UnderContruction';
// import { useQueryClient } from '@tanstack/react-query';

// export const FacilitatorReview = ({ grant }: { grant: DashGrant }) => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const { tx } = useTx();
//   const theme = useMantineTheme();
//   const queryClient = useQueryClient();

//   const [reasonText, setReasonText] = useState('');
//   const handleApprove = async (isApproved: boolean) => {
//     if (grant.grantStatus !== GrantStatus.ShipApproved) {
//       return;
//     }

//     const poolId = grant.shipId.poolId;
//     const grantAmount = grant.applicationData.grantAmount;

//     if (
//       isApproved === undefined ||
//       !reasonText ||
//       !poolId ||
//       !grant.shipId.id ||
//       !grantAmount
//     ) {
//       console.error(
//         `Invalid Data for review ${isApproved} ${reasonText} ${poolId} ${isApproved} ${grantAmount}`
//       );
//       notifications.show({
//         title: 'Error',
//         message: 'Invalid Data for review',
//         color: 'red',
//       });

//       return;
//     }

//     close();

//     const pinRes = await pinJSONToIPFS({
//       reason: reasonText,
//       reviewer: grant.shipId.id,
//     });

//     if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
//       notifications.show({
//         title: 'IPFS Upload Error',
//         message: pinRes.IpfsHash[1],
//         color: 'red',
//       });
//       return;
//     }

//     tx({
//       writeContractParams: {
//         address: ADDR.ALLO,
//         abi: AlloAbi,
//         functionName: 'allocate',
//         args: [poolId, encoded],
//       },
//       onComplete() {
//         queryClient.invalidateQueries({
//           queryKey: [`fac-grants`],
//         });
//       },
//     });
//   };

//   const hasShipApproved = grant.grantStatus >= GrantStatus.ShipApproved;
//   const hasFacilitatorApproved =
//     grant.grantStatus >= GrantStatus.FacilitatorApproved;

//   const hasFacilitatorReviewed = grant.grantStatus > GrantStatus.ShipApproved;
//   const hasFunds =
//     BigInt(grant.applicationData.grantAmount) <=
//     BigInt(grant.shipId.totalAvailableFunds);

//   return (
//     <>
//       {hasFacilitatorReviewed ? (
//         <Button size="xs" ml="auto" variant="subtle" onClick={open}>
//           View
//         </Button>
//       ) : (
//         <Button size="xs" ml="auto" onClick={open}>
//           Review
//         </Button>
//       )}
//       <Modal
//         opened={opened}
//         onClose={close}
//         fullScreen
//         transitionProps={{ transition: 'fade', duration: 200 }}
//       >
//         <ReviewPage
//           title={`Application from ${grant.projectId.name}`}
//           sections={[
//             {
//               subtitle: 'Project Description',
//               content: grant.projectMetadata.description,
//             },
//             'DIVIDER',
//             {
//               subtitle: 'The Ask',
//               content: hasFunds ? (
//                 `${formatEther(grant.applicationData.grantAmount)} ${GAME_TOKEN.SYMBOL}`
//               ) : (
//                 <Group gap={'xs'} align="start">
//                   <Text fz="sm" c={theme.colors.red[5]}>
//                     {formatEther(grant.applicationData.grantAmount)}{' '}
//                     {GAME_TOKEN.SYMBOL}
//                   </Text>
//                   <Tooltip label="Amount requested exceeds funding available. Application cannot be approved">
//                     <IconExclamationCircle
//                       color={theme.colors.red[5]}
//                       size={18}
//                     />
//                   </Tooltip>
//                 </Group>
//               ),
//             },
//             {
//               subtitle: 'Expected Delivery',
//               content: secondsToLongDateTime(
//                 Number(grant.applicationData.dueDate)
//               ),
//             },
//             {
//               subtitle: 'Receiving Address',
//               content: grant.applicationData.receivingAddress,
//             },
//             {
//               subtitle: 'Proposal Link',
//               content: (
//                 <Text
//                   component="a"
//                   href={grant.applicationData.extraLink}
//                   fz="sm"
//                   rel="noopener noreferrer"
//                   target="_blank"
//                   td="underline"
//                 >
//                   {grant.applicationData.extraLink}
//                 </Text>
//               ),
//             },
//             {
//               subtitle: 'Objectives',
//               content: grant.applicationData.objectives,
//             },
//             grant.applicationData.extraInfo
//               ? {
//                   subtitle: 'Additional Information',
//                   content: grant.applicationData.extraInfo,
//                 }
//               : null,
//             grant.applicationData.extraLink
//               ? {
//                   subtitle: 'Additional Link',
//                   content: (
//                     <Text
//                       component="a"
//                       href={grant.applicationData.extraLink}
//                       fz="sm"
//                       rel="noopener noreferrer"
//                       target="_blank"
//                       td="underline"
//                     >
//                       {grant.applicationData.extraLink}
//                     </Text>
//                   ),
//                 }
//               : null,
//           ]}
//           footerSection={
//             <>
//               {grant.shipApprovalReason && (
//                 <AppAlert
//                   mt={0}
//                   mb={'xl'}
//                   icon={hasShipApproved ? <IconCheck /> : <IconX />}
//                   title={`${hasShipApproved ? 'Approval' : 'Rejection'} from
//                     ${grant.shipId.name}`}
//                   description={`"${grant.shipApprovalReason}"`}
//                   bg={
//                     hasShipApproved ? theme.colors.blue[8] : theme.colors.red[6]
//                   }
//                 />
//               )}
//               {grant.facilitatorReason && (
//                 <AppAlert
//                   mt={0}
//                   mb={'xl'}
//                   icon={hasFacilitatorApproved ? <IconCheck /> : <IconX />}
//                   title={`${hasFacilitatorApproved ? 'Approval' : 'Rejection'} from
//                     Game Facilitators`}
//                   description={`"${grant.facilitatorReason}"`}
//                   bg={
//                     hasFacilitatorApproved
//                       ? theme.colors.blue[8]
//                       : theme.colors.red[6]
//                   }
//                 />
//               )}
//               {grant.grantStatus === GrantStatus.ShipApproved && (
//                 <>
//                   <Text mb="md" fw={600}>
//                     Approve or Reject Applicant
//                   </Text>
//                   <Textarea
//                     label="Reasoning"
//                     description="Why are you approving or rejecting this application?"
//                     value={reasonText}
//                     onChange={(e) => setReasonText(e.currentTarget.value)}
//                     autosize
//                     required
//                     minRows={4}
//                     maxRows={8}
//                     mb="xl"
//                   />
//                   <Flex justify="space-between">
//                     <TxButton
//                       variant="outline"
//                       disabled={!reasonText}
//                       onClick={() => handleApprove(false)}
//                     >
//                       Reject
//                     </TxButton>
//                     <TxButton
//                       disabled={!reasonText || !hasFunds}
//                       onClick={() => handleApprove(true)}
//                     >
//                       Approve
//                     </TxButton>
//                   </Flex>
//                 </>
//               )}
//             </>
//           }
//         />
//       </Modal>
//     </>
//   );
// };
