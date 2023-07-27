import { Box, SkeletonText, chakra } from "@chakra-ui/react";
import { usePrometheusMetrics } from "../api/api";

function PrometheusOutput() {
  const { data, isLoading, isRefetching } = usePrometheusMetrics();

  return (
    <Box pos="relative">
      {isLoading || isRefetching ? (
        <SkeletonText noOfLines={40} skeletonHeight={6} />
      ) : (
        <chakra.pre whiteSpace="pre-wrap">{data}</chakra.pre>
      )}
    </Box>
  );
}

export default PrometheusOutput;
