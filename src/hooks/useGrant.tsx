import React from 'react';
import { GrantContext } from '../contexts/GrantContext';
import { GrantQueryType } from '../queries/getGrant';

export const useGrant = () => {
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
  } as GrantQueryType;
};
