// import { Text, Timeline, useMantineTheme } from '@mantine/core';
// import { DashGrant } from '../../resolvers/grantResolvers';
// import { UnpackedMilestoneData } from './MilestoneReviewPage';
// import { IconCheck, IconEye, IconX } from '@tabler/icons-react';
// import { AlloStatus, GrantStatus } from '../../types/common';
// import { formatEther } from 'viem';
// import { GAME_TOKEN } from '../../constants/gameSetup';
// import { secondsToLongDate } from '../../utils/time';
// import { MilestoneAction } from './MilestoneAction';
// import { AppAlert } from '../UnderContruction';

// export const MilestoneTimeline = ({
//   milestones,
//   close,
//   grant,
//   view,
//   isShipOperator,
//   isProjectMember,
// }: {
//   close: () => void;
//   isProjectMember?: boolean;
//   isShipOperator?: boolean;
//   view: 'project-page' | 'ship-dash';
//   milestones: UnpackedMilestoneData[];
//   grant: DashGrant;
// }) => {
//   const theme = useMantineTheme();
//   return (
//     <Timeline bulletSize={32} lineWidth={2} active={milestones?.length - 1}>
//       {milestones.map((milestone, index) => {
//         const milestoneStatus = milestone.milestoneStatus;
//         const isCurrentMilestone =
//           index === Number(grant.currentMilestoneIndex);

//         return (
//           <Timeline.Item
//             key={`milestone-${index}`}
//             bullet={
//               milestoneStatus === AlloStatus.Accepted ? (
//                 <IconCheck />
//               ) : milestoneStatus === AlloStatus.Rejected ? (
//                 <IconX />
//               ) : milestoneStatus === AlloStatus.Pending ? (
//                 <IconEye />
//               ) : (
//                 index + 1
//               )
//             }
//             color={
//               milestoneStatus === AlloStatus.Accepted
//                 ? theme.colors.blue[6]
//                 : milestoneStatus === AlloStatus.Pending
//                   ? theme.colors.violet[6]
//                   : milestoneStatus === AlloStatus.Rejected
//                     ? theme.colors.pink[6]
//                     : theme.colors.dark[5]
//             }
//           >
//             <Text mb={2}>
//               Milestone{' '}
//               {milestoneStatus === AlloStatus.Accepted
//                 ? 'Approved'
//                 : milestoneStatus === AlloStatus.Rejected
//                   ? 'Rejected'
//                   : milestoneStatus === AlloStatus.Pending
//                     ? 'In Review'
//                     : index + 1}
//             </Text>
//             <Text mb="xs" size="xs" opacity={0.8}>
//               Payment Percentage:{' '}
//               {formatEther((milestone.amountPercentage || 0n) * 100n)}% (
//               {formatEther(
//                 (grant.applicationData.grantAmount *
//                   milestone.amountPercentage) /
//                   1000000000000000000n
//               )}{' '}
//               {GAME_TOKEN.SYMBOL})
//             </Text>
//             {milestone.date && (
//               <Text mb="xs" size="xs" opacity={0.8}>
//                 {secondsToLongDate(milestone.date)}
//               </Text>
//             )}
//             <Text size="sm" className="ws-pre-wrap">
//               {milestone.milestoneDetails}
//             </Text>
//             {grant.milestoneRejectedReason &&
//               isCurrentMilestone &&
//               grant.grantStatus === GrantStatus.MilestoneRejected && (
//                 <AppAlert
//                   title="Milestone Rejected"
//                   icon={<IconX />}
//                   bg={theme.colors.red[6]}
//                   description={`"${grant.milestoneRejectedReason}"`}
//                 />
//               )}
//             {isCurrentMilestone && (
//               <MilestoneAction
//                 close={close}
//                 grant={grant}
//                 view={view}
//                 currentMilestone={index}
//                 isProjectMember={isProjectMember}
//                 isShipOperator={isShipOperator}
//                 milestone={milestone}
//               />
//             )}
//           </Timeline.Item>
//         );
//       })}
//     </Timeline>
//   );
// };
