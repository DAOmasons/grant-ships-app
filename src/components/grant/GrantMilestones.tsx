import { useGrant } from '../../hooks/useGrant';
import { Display } from '../Display';
import { MilestoneSetDisplay } from './MilestoneSetDisplay';

export const GrantMilestones = () => {
  const { currentMilestoneSet } = useGrant();

  if (!currentMilestoneSet)
    return (
      <Display
        title="Milestones Not Submitted"
        description="Project has yet to submit their milestones"
      />
    );

  return <MilestoneSetDisplay doc={currentMilestoneSet} />;
};
