export const _grantId = ({
  projectId,
  shipSrc,
}: {
  projectId: string;
  shipSrc: string;
}) => `grant-${projectId}-${shipSrc}`;
