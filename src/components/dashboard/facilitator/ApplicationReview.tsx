import { useState } from 'react';
import { Box, Button, Divider, Flex, Text, Textarea } from '@mantine/core';
import { ShipReviewData } from './FacilitatorShipDash';

export const ApplicationReview = ({
  shipReviewData,
  handleApprove,
}: {
  shipReviewData: ShipReviewData | null;
  handleApprove: (isApproved: boolean, reason: string) => void;
}) => {
  const [reasonText, setReasonText] = useState('');

  return (
    <Flex justify={'center'} w="100%" h={'90vh'}>
      <Box maw={600} miw={300} p="xl">
        <Text fz={20} fw={500} mb="lg">
          Review Application
        </Text>
        <Text fz="lg" fw={700} mb="md">
          Ship Name
        </Text>
        <Text fz="md" mb="xl">
          {shipReviewData?.name}
        </Text>
        <Text fz="lg" fw={700} mb="md">
          Impact Thesis
        </Text>
        <Text fz="md" mb="xl">
          {shipReviewData?.impactThesis}
        </Text>
        <Text fz="lg" fw={700} mb="md">
          Submission Guidelines
        </Text>
        <Text fz="md" mb="xl">
          {shipReviewData?.submissionGuidelines}
        </Text>
        <Text fz="lg" fw={700} mb="md">
          Management Fee
        </Text>
        <Text fz="md" mb="xl">
          {shipReviewData?.fee}
        </Text>
        <Text fz="lg" fw={700} mb="md">
          Additional Link
        </Text>
        {shipReviewData?.extraLink ? (
          <Text
            fz="md"
            mb="xl"
            component="a"
            rel="noopener noreferrer"
            target="_blank"
          >
            {shipReviewData?.extraLink}
          </Text>
        ) : (
          <Text fz="md" mb="xl" fs="italic" opacity={0.7}>
            No additional link provided
          </Text>
        )}
        <Text fz="lg" fw={700} mb="md">
          Additional Information
        </Text>
        <Text fz="md" mb="xl">
          {shipReviewData?.additionalInfo}
        </Text>
        <Divider mb={'xl'} />
        <Textarea
          value={reasonText}
          label="Reasoning"
          description="Why are you approving or rejecting this application?"
          onChange={(e) => setReasonText(e.currentTarget.value)}
          autosize
          required
          minRows={4}
          maxRows={8}
          mb="xl"
        />
        <Flex justify="space-between" pb="xl">
          <Button
            variant="outline"
            disabled={!reasonText}
            onClick={() => handleApprove(false, reasonText)}
          >
            Reject
          </Button>
          <Button
            disabled={!reasonText}
            onClick={() => handleApprove(false, reasonText)}
          >
            Approve
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
