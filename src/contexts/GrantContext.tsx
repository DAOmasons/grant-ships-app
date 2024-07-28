import { createContext, ReactNode } from 'react';
import {
  getGrant,
  GrantQueryType,
  ProjectGrant,
  ShipGrant,
} from '../queries/getGrant';
import { useQuery } from '@tanstack/react-query';
import { Content } from '@tiptap/react';

export const GrantContext = createContext<GrantQueryType>({
  project: null,
  ship: null,
  beacon: null,
  applicationTemplate: null,
  timeline: [],
});

export const GrantContextProvider = ({
  children,
  grantId,
}: {
  children: ReactNode;
  grantId: string;
}) => {
  const {
    data: grant,
    isLoading: isLoadingGrant,
    error: grantError,
    refetch: refetchGrant,
  } = useQuery({
    queryKey: ['grant', grantId],
    queryFn: () => getGrant(grantId),
  });

  return (
    <GrantContext.Provider
      value={{
        project: (grant?.project as ProjectGrant) || null,
        ship: (grant?.ship as ShipGrant) || null,
        beacon: (grant?.beacon as Content) || null,
        applicationTemplate: (grant?.applicationTemplate as Content) || null,
        timeline: grant?.timeline || [],
      }}
    >
      {children}
    </GrantContext.Provider>
  );
};
