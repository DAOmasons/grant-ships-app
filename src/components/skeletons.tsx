import { Box, Skeleton } from '@mantine/core';
import { SingleItemPageLayout } from '../layout/SingleItemPage';

export const SingleItemPageSkeleton = () => {
  return (
    <SingleItemPageLayout
      mainSection={
        <Box w={'100%'}>
          <Skeleton h={160} w="100%" maw={160} radius="50%" mt="xl" mb="md" />
          <Skeleton h={22} w="100%" maw={150} mb="xs" />
          <Skeleton h={18} w="100%" maw={100} mb="xs" />
          <Skeleton h={80} mb="md" w={537} />
          <Skeleton h={32} w={150} mb="xl" />
          <Skeleton h={1} w="100%" mb="xl" />
          <Skeleton h={140} w="100%" mb="xl" />
          <Skeleton h={140} w="100%" mb="xl" />
          <Skeleton h={140} w="100%" mb="xl" />
        </Box>
      }
      sideSection={
        <>
          <Skeleton h={70} w="100%" mt="xl" />
          <Skeleton h={140} w="100%" />
        </>
      }
    />
  );
};

export const FeedSkeletonCard = () => {
  return <Skeleton w={'100%'} h="2" mt={130} />;
};
