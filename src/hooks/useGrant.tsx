import React from 'react';
import { GrantContext } from '../contexts/GrantContext';

type UseGrant = GrantContext & { grantExists: boolean };

export const useGrant = (): UseGrant => {
  const context = React.useContext(GrantContext);

  if (context === undefined) {
    throw new Error('useGrant must be used within a GrantContextProvider');
  }

  return {
    project: context.project,
    ship: context.ship,
    beacon: context.beacon,
    applicationTemplate: context.applicationTemplate,
    timeline: context.timeline,
    grant: context.grant,
    grantExists: !!context.grant,
    isLoadingGrant: context.isLoadingGrant,
    grantError: context.grantError,
    refetchGrant: context.refetchGrant,
    isProjectMember: context.isProjectMember,
    isShipOperator: context.isShipOperator,
  };
};
