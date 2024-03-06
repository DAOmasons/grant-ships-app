import { useQuery } from '@tanstack/react-query';
import { getFacilitatorGrants } from '../../../queries/getFacilitatorGrants';
import { Skeleton, Stack, useMantineTheme } from '@mantine/core';
import { AppAlert } from '../../UnderContruction';
import { GrantApprovalCard } from './GrantApprovalCard';

export const ProjectApproval = () => {
  const {
    data: grants,
    error: grantsError,
    isLoading: grantsLoading,
  } = useQuery({
    queryKey: ['fac-grants'],
    queryFn: getFacilitatorGrants,
  });

  const theme = useMantineTheme();

  if (grantsLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (grantsError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={grantsError.message || 'Error loading grants data'}
      />
    );

  if (!grants)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={'Erro loading grants data'}
      />
    );

  if (grants.length === 0)
    return (
      <AppAlert
        title={'No Grants'}
        description={'Grants have not been submitted to Grant Ships yet'}
      />
    );

  return (
    <Stack gap={'lg'}>
      {grants.map((grant) => (
        <GrantApprovalCard key={grant.id} grant={grant} />
      ))}
    </Stack>
  );
};
