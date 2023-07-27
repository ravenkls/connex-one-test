import {
  Flex,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useEpochTime } from "../api/api";
import Error from "./Error";

function TimeDifference() {
  const { data, isSuccess, isLoading, isRefetching, isError } = useEpochTime();
  const [difference, setDifference] = useState(0);

  const calculateDifference = useCallback(() => {
    if (isSuccess) {
      const clientTime = new Date().getTime();
      const serverTime = data.epoch * 1000;
      const difference = clientTime - serverTime;
      setDifference(difference);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    calculateDifference();
    const interval = setInterval(calculateDifference, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms: number) => {
    //  return format as 00:00:00
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
  };

  if (isError) return <Error />;

  return (
    <Flex justify="center" align="center">
      <Stat>
        <StatLabel>Server Time</StatLabel>
        <StatNumber>
          <Skeleton
            isLoaded={!isLoading && !isRefetching}
            data-testid="skeleton"
          >
            {data?.epoch}
          </Skeleton>
        </StatNumber>
        <StatHelpText>
          Time since last fetched: {formatDuration(difference)}
        </StatHelpText>
      </Stat>
    </Flex>
  );
}

export default TimeDifference;
