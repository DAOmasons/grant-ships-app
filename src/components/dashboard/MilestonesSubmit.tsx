// import { useDisclosure } from '@mantine/hooks';
// import { DashGrant } from '../../resolvers/grantResolvers';
// import { useMemo } from 'react';
// import { GrantStatus } from '../../types/common';
// import { AppAlert } from '../UnderContruction';
// import { MilestoneBuilder } from './MilestonesBuilder';
// import { Button, Group, Modal, Text } from '@mantine/core';
// import { ReviewPage } from '../../layout/ReviewPage';

// export const MilestonesSubmit = ({
//   isProjectMember,
//   view,
//   grant,
// }: {
//   grant: DashGrant;
//   isProjectMember?: boolean;
//   isShipOperator?: boolean;
//   view: 'project-page' | 'ship-dash';
// }) => {
//   const [opened, { open, close }] = useDisclosure(false);

//   const currentStatus = grant.grantStatus;
//   const milestoneReviewSections = useMemo(() => {
//     if (!grant || !view) return [];

//     if (
//       isProjectMember &&
//       view === 'project-page' &&
//       currentStatus === GrantStatus.FacilitatorApproved
//     ) {
//       return [
//         {
//           subtitle: '',
//           content: (
//             <AppAlert
//               title="Awaiting Milestones"
//               description="Ship Operators are awaiting milestones for your grant"
//             />
//           ),
//         },
//         {
//           subtitle: 'Create your Milestones',
//           content: <MilestoneBuilder grant={grant} close={close} />,
//         },
//       ];
//     }

//     if (currentStatus === GrantStatus.FacilitatorApproved) {
//       return [
//         {
//           subtitle: '',
//           content: (
//             <AppAlert
//               title="Awaiting Milestones"
//               description={`Awaiting Milestones for ${grant.projectId.name}`}
//             />
//           ),
//         },
//       ];
//     }

//     return [];
//   }, [grant, view, isProjectMember, currentStatus, close]);

//   if (currentStatus < GrantStatus.FacilitatorApproved)
//     return <Text fz="sm">Awaiting Milestones</Text>;

//   return (
//     <>
//       <Group justify="space-between" align="start">
//         <Text fz="sm">Awaiting Milestones</Text>
//         {isProjectMember && view === 'project-page' ? (
//           <Button
//             size="xs"
//             style={{
//               transform: 'translateY(-2px)',
//             }}
//             onClick={open}
//           >
//             Submit
//           </Button>
//         ) : (
//           <Button
//             size="xs"
//             style={{
//               transform: 'translateY(-2px)',
//             }}
//             variant="subtle"
//             onClick={open}
//           >
//             View
//           </Button>
//         )}
//       </Group>
//       <Modal
//         opened={opened}
//         onClose={close}
//         fullScreen
//         transitionProps={{ transition: 'fade', duration: 200 }}
//       >
//         <ReviewPage
//           title={`Milestone Review for ${grant.projectId.name}`}
//           sections={milestoneReviewSections}
//         />
//       </Modal>
//     </>
//   );
// };
