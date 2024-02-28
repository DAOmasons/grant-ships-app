import { useDisclosure } from '@mantine/hooks';
import { DashGrant } from '../../resolvers/grantResolvers';
import { useUserData } from '../../hooks/useUserState';
import { Button, Group, Modal, Text } from '@mantine/core';
import { MilestoneReviewPage } from './MilestoneReviewPage';

export const MilestonesReview = ({
  grant,
  view,
}: {
  grant: DashGrant;
  view: 'project-page' | 'ship-dash';
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { userData } = useUserData();

  const isShipOperator =
    userData?.isShipOperator && userData.shipAddress === grant.shipId.id;

  const handleClose = () => {
    close();
  };
  return (
    <>
      <Group justify="space-between" align="start">
        {view === 'ship-dash' && isShipOperator ? (
          <>
            <Text fz="sm">Review Milestones</Text>
            <Button
              size="xs"
              style={{
                transform: 'translateY(-2px)',
              }}
              onClick={open}
            >
              Review
            </Button>{' '}
          </>
        ) : (
          <>
            <Text fz="sm">Reviewing Milestones</Text>
            <Button
              size="xs"
              style={{
                transform: 'translateY(-2px)',
              }}
              onClick={open}
              variant="subtle"
            >
              View
            </Button>{' '}
          </>
        )}
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <MilestoneReviewPage
          view={view}
          grant={grant}
          opened={opened}
          isShipOperator={isShipOperator}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};
