import { createContext, ReactNode, useMemo } from 'react';
import {
  getGrant,
  GrantQueryType,
  ProjectGrant,
  ShipGrant,
} from '../queries/getGrant';
import { useQuery } from '@tanstack/react-query';
import { Content } from '@tiptap/react';
import { useUserData } from '../hooks/useUserState';

export type GrantContext = GrantQueryType & {
  isLoadingGrant: boolean;
  grantError: Error | null;
  isProjectMember?: boolean;
  isShipOperator?: boolean;
  refetchGrant: () => void;
};

export const GrantContext = createContext<GrantContext>({
  project: null,
  ship: null,
  beacon: null,
  applicationTemplate: null,
  timeline: [],
  isLoadingGrant: false,
  grantError: null,
  isProjectMember: undefined,
  isShipOperator: undefined,
  refetchGrant: () => {},
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

  const { userData } = useUserData();

  const isShipOperator =
    userData &&
    userData.isShipOperator &&
    userData.shipAddress === grant?.ship?.id;

  const isProjectMember = useMemo(() => {
    return (
      userData &&
      !!userData.projects?.find(
        (project) => project.anchor === grant?.project?.id
      )
    );
  }, [userData, grant]);

  return (
    <GrantContext.Provider
      value={{
        project: (grant?.project as ProjectGrant) || null,
        ship: (grant?.ship as ShipGrant) || null,
        beacon: (grant?.beacon as Content) || null,
        applicationTemplate: (grant?.applicationTemplate as Content) || null,
        timeline: grant?.timeline || [],
        isLoadingGrant,
        grantError,
        refetchGrant,
        isProjectMember,
        isShipOperator,
      }}
    >
      {children}
    </GrantContext.Provider>
  );
};
