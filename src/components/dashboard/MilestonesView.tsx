// import { useDisclosure } from '@mantine/hooks';
// import { DashGrant } from '../../resolvers/grantResolvers';

// import { Button, Group, Modal, Text } from '@mantine/core';
// import { MilestoneReviewPage } from './MilestoneReviewPage';

// export const MilestonesView = ({
//   grant,
//   view,
//   isShipOperator,
//   isProjectMember,
// }: {
//   grant: DashGrant;
//   view: 'project-page' | 'ship-dash';
//   isShipOperator?: boolean;
//   isProjectMember?: boolean;
// }) => {
//   const [opened, { open, close }] = useDisclosure(false);

//   const handleClose = () => {
//     close();
//   };

//   return (
//     <>
//       <Group justify="space-between" align="start">
//         <Text fz="sm">Milestones Accepted</Text>
//         <Button
//           size="xs"
//           style={{
//             transform: 'translateY(-2px)',
//           }}
//           onClick={open}
//           variant="subtle"
//         >
//           View
//         </Button>
//       </Group>
//       <Modal
//         opened={opened}
//         onClose={close}
//         fullScreen
//         transitionProps={{ transition: 'fade', duration: 200 }}
//       >
//         <MilestoneReviewPage
//           view={view}
//           grant={grant}
//           opened={opened}
//           isShipOperator={isShipOperator}
//           isProjectMember={isProjectMember}
//           handleClose={handleClose}
//         />
//       </Modal>
//     </>
//   );
// };
