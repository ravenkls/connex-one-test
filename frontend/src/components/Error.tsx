import { Alert, AlertIcon } from "@chakra-ui/react";

function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      Something went wrong while fetching data. Please try again later.
    </Alert>
  );
}

export default Error;
