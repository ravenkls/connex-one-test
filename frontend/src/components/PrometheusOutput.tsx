import { Box, SkeletonText, chakra } from "@chakra-ui/react";
import { usePrometheusMetrics } from "../api/api";
import Error from "./Error";

function PrometheusOutput() {
  const { data, isLoading, isRefetching, isError } = usePrometheusMetrics();

  if (isError) return <Error />;

  return (
    <Box pos="relative">
      {isLoading || isRefetching ? (
        <SkeletonText
          noOfLines={40}
          skeletonHeight={6}
          data-testid="skeleton"
        />
      ) : (
        <chakra.pre whiteSpace="pre-wrap">{data}</chakra.pre>
      )}
    </Box>
  );
}

export default PrometheusOutput;
