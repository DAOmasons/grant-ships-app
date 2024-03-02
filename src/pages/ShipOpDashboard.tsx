import { Skeleton, Stack, Tabs, useMantineTheme } from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DashShip, getShipDash } from '../queries/getShipDash';
import { AppAlert } from '../components/UnderContruction';
import { GrantCard } from '../components/dashboard/GrantCard';

export const ShipOpDashboard = () => {
  const { id } = useParams();

  const {
    data: shipData,
    error: shipError,
    isLoading: shipLoading,
  } = useQuery({
    queryKey: [`ship-dash-${id}`],
    queryFn: () => getShipDash(id as string),
    enabled: !!id,
  });

  return (
    <MainSection>
      <PageTitle title="Ship Dashboard" />
      <Tabs defaultValue="grants">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="grants">Grants</Tabs.Tab>
          <Tabs.Tab value="application">Ship Application</Tabs.Tab>
          <Tabs.Tab value="postUpdate">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="grants">
          <GrantManager
            shipData={shipData}
            shipError={shipError}
            shipLoading={shipLoading}
          />
        </Tabs.Panel>
        <Tabs.Panel value="application">
          <AppAlert
            title={'Under Contruction'}
            description={"This feature isn't built yet. Check back soon."}
          />
        </Tabs.Panel>
        <Tabs.Panel value="postUpdate">
          <AppAlert
            title={'Under Contruction'}
            description={"This feature isn't built yet. Check back soon."}
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

export const GrantManager = ({
  shipData,
  shipError,
  shipLoading,
}: {
  shipData?: DashShip;
  shipError: Error | null;
  shipLoading: boolean;
}) => {
  const theme = useMantineTheme();

  if (shipLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (shipError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={shipError.message || 'Error loading ship data'}
      />
    );

  if (!shipData)
    return (
      <AppAlert
        title={'Ship Not Found'}
        description={'The ship you are looking for does not exist.'}
      />
    );

  if (shipData.grants.length === 0)
    return (
      <AppAlert
        title={'No Grants'}
        description={'There are no grants for this ship.'}
      />
    );

  return (
    <Stack gap={'lg'}>
      {shipData?.grants.map((grant) => (
        <GrantCard key={grant.id} grant={grant} view="ship-dash" />
      ))}
    </Stack>
  );
};
