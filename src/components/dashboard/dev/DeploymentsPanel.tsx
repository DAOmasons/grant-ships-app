// import {
//   Box,
//   Group,
//   Paper,
//   Spoiler,
//   Text,
//   useMantineTheme,
// } from '@mantine/core';
// import { GmDeployment } from '../../../resolvers/gmResolvers';
// import { SCAN_URL } from '../../../constants/enpoints';
// import { IconExternalLink } from '@tabler/icons-react';

// export const DeploymentsPanel = ({
//   deploys,
//   error,
//   isLoading,
// }: {
//   deploys?: GmDeployment[];
//   error: Error | null;
//   isLoading: boolean;
// }) => {
//   if (isLoading) {
//     return <Box p="md">Loading...</Box>;
//   }

//   if (error || !deploys) {
//     return (
//       <Box p="md">
//         Error: {error?.message || 'Unexpected Deploy Query error'}
//       </Box>
//     );
//   }

//   if (deploys.length === 0) {
//     return <Box p="md">No deployments available</Box>;
//   }

//   return (
//     <Box p="md">
//       <Text fw={700} mb="md">
//         Current Deployments
//       </Text>

//       {deploys.map((deploy) => (
//         <DeploymentCard key={deploy.id} deploy={deploy} />
//       ))}
//     </Box>
//   );
// };

// const DeploymentCard = ({ deploy }: { deploy: GmDeployment }) => {
//   const theme = useMantineTheme();
//   return (
//     <Paper p="md" mb="md" bg={theme.colors.dark[6]}>
//       <Text fz="sm" fw={600} mb="sm">
//         {deploy.poolMetadata.title}
//       </Text>
//       <Text fz="sm" opacity={0.8} mb={'md'}>
//         {deploy.poolMetadata.description}
//       </Text>
//       <Spoiler maxHeight={0} showLabel="Show More" hideLabel="Hide">
//         <Text fz="sm" mb="xs">
//           Address
//         </Text>
//         <Group mb={'lg'} gap={4}>
//           <Text
//             fz="sm"
//             opacity={0.8}
//             component="a"
//             href={`${SCAN_URL}/address/${deploy.address}`}
//             td="underline"
//             target="_blank"
//             rel="noreferrer"
//           >
//             {deploy.address}
//           </Text>
//           <IconExternalLink size={12} />
//         </Group>
//         <Text fz="sm" mb="xs">
//           Version
//         </Text>
//         <Group mb={'lg'} gap={4}>
//           <Text
//             fz="sm"
//             opacity={0.8}
//             component="a"
//             href={`${SCAN_URL}/address/${deploy.version.address}`}
//             td="underline"
//             target="_blank"
//             rel="noreferrer"
//           >
//             {deploy.version.name}
//           </Text>
//           <IconExternalLink size={12} />
//         </Group>
//         <Text fz="sm" mb="xs">
//           Allo Pool ID
//         </Text>
//         <Text fz="sm" opacity={0.8} mb="lg">
//           {deploy.poolId}
//         </Text>
//         <Text fz="sm" mb="xs">
//           Allo Pool Profile ID
//         </Text>
//         <Text fz="sm" opacity={0.8} mb="lg">
//           {deploy.profileId}
//         </Text>
//         <Text fz="sm" mb="xs">
//           Block Number
//         </Text>
//         <Text fz="sm" opacity={0.8} mb="lg">
//           {deploy.blockNumber}
//         </Text>
//       </Spoiler>
//     </Paper>
//   );
// };
