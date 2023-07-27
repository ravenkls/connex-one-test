import { Card, Container, Heading } from "@chakra-ui/react";
import PrometheusOutput from "./components/PrometheusOutput";
import SplitView from "./components/SplitView";
import TimeDifference from "./components/TimeDifference";

function App() {
  return (
    <Container maxW="1920px" my={[4, null, 12]}>
      <Heading my={8}>Connex One Test</Heading>
      <SplitView>
        <Card p={4}>
          <TimeDifference />
        </Card>
        <Card p={4}>
          <PrometheusOutput />
        </Card>
      </SplitView>
    </Container>
  );
}

export default App;
