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
  grant: null,
  currentApplication: null,
  currentMilestoneSet: null,
});

export const GrantContextProvider = ({
  children,
  grantId,
}: {
  children: ReactNode;
  grantId: string;
}) => {
  const {
    data,
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
    userData.shipAddress === data?.ship?.id;

  const isProjectMember = useMemo(() => {
    return (
      userData &&
      !!userData.projects?.find(
        (project) => project.anchor === data?.project?.id
      )
    );
  }, [userData, data]);

  return (
    <GrantContext.Provider
      value={{
        grant: data?.grant!,
        project: (data?.project as ProjectGrant) || null,
        ship: (data?.ship as ShipGrant) || null,
        beacon: (data?.beacon as Content) || null,
        applicationTemplate: (data?.applicationTemplate as Content) || null,
        timeline: data?.timeline || [],
        isLoadingGrant,
        grantError,
        refetchGrant,
        isProjectMember,
        isShipOperator,
        currentApplication: data?.currentApplication || null,
        currentMilestoneSet: data?.currentMilestoneSet || null,
      }}
    >
      {children}
    </GrantContext.Provider>
  );
};
