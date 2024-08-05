// import { useState } from 'react';
// import { useTx } from '../../hooks/useTx';
// import { DashGrant } from '../../resolvers/grantResolvers';
// import { UnpackedMilestoneData } from './MilestoneReviewPage';
// import { notifications } from '@mantine/notifications';
// import { pinJSONToIPFS } from '../../utils/ipfs/pin';
// import GrantShipAbi from '../../abi/GrantShip.json';
// import { Box, Divider, Flex } from '@mantine/core';
// import { TxButton } from '../TxButton';
// import { useQueryClient } from '@tanstack/react-query';

// export const SubmitMilestone = ({
//   grant,
//   milestone,
//   currentMilestone,
//   isProjectMember,
//   isResubmitting,
//   close,
// }: {
//   close: () => void;
//   isProjectMember?: boolean;
//   currentMilestone: number;
//   grant: DashGrant;
//   isResubmitting?: boolean;
//   milestone: UnpackedMilestoneData;
// }) => {
//   const { tx } = useTx();
//   const [isPinning, setPinning] = useState(false);
//   const queryClient = useQueryClient();

//   const handleSubmitMilestone = async () => {
//     const dateInSeconds = Date.now() / 1000;

//     setPinning(true);

//     if (!isProjectMember) {
//       notifications.show({
//         title: 'Error',
//         message: 'You are not a member of this project',
//         color: 'red',
//       });
//       return;
//     }

//     if (!milestone.milestoneDetails) {
//       notifications.show({
//         title: 'Error',
//         message: 'Data is missing',
//         color: 'red',
//       });
//       return;
//     }

//     if (
//       !grant.projectId.id ||
//       !grant.shipId.shipContractAddress ||
//       currentMilestone == null
//     ) {
//       notifications.show({
//         title: 'Error',
//         message: 'Function call arguments is missing',
//         color: 'red',
//       });
//       return;
//     }

//     const ipfsRes = await pinJSONToIPFS({
//       milestoneDetails: milestone.milestoneDetails,
//       date: milestone.date,
//       lastUpdated: dateInSeconds,
//     });

//     if (ipfsRes.IpfsHash[0] !== 'Q') {
//       notifications.show({
//         title: 'IPFS Error',
//         message: ipfsRes.IpfsHash[1],
//         color: 'red',
//       });
//       return;
//     }

//     setPinning(false);
//     close();

//     tx({
//       writeContractParams: {
//         abi: GrantShipAbi,
//         address: grant.shipId.shipContractAddress,
//         functionName: 'submitMilestone',
//         args: [grant.projectId.id, currentMilestone, [1n, ipfsRes.IpfsHash]],
//       },
//       onComplete() {
//         queryClient.invalidateQueries({
//           queryKey: [`project-grants-${grant.projectId.id}`],
//         });
//       },
//     });
//   };

//   return (
//     <Box mt="lg">
//       <Divider mb="md" />
//       <Flex>
//         <TxButton
//           ml="auto"
//           onClick={() => handleSubmitMilestone()}
//           loading={isPinning}
//         >
//           {isResubmitting ? 'Resubmit milestone' : 'Submit Milestone'}
//         </TxButton>
//       </Flex>
//     </Box>
//   );
// };
