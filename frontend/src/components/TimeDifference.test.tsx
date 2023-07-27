import { ChakraProvider } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useEpochTime } from "../api/api";
import { Epoch } from "../api/types";
import TimeDifference from "./TimeDifference";

jest.mock("../api/api", () => ({
  useEpochTime: jest.fn(),
}));

const mockUseEpochTime = useEpochTime as jest.MockedFunction<
  typeof useEpochTime
>;

describe("TimeDifference", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 10, 13, 15));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("When the API call is successful", () => {
    beforeAll(() => {
      mockUseEpochTime.mockImplementation(
        () =>
          ({
            data: { epoch: 1634131200 },
            isSuccess: true,
            isLoading: false,
            isRefetching: false,
          } as UseQueryResult<Epoch>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders the server time and time difference", async () => {
      render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      const serverTimeElement = await screen.findByText("1634131200");
      expect(serverTimeElement).toBeInTheDocument();
      await waitFor(() => {
        const timeDifferenceElement = screen.getByText(
          /Time since last fetched/
        );
        expect(timeDifferenceElement).toBeInTheDocument();
      });
    });
  });

  describe("When the API call is loading", () => {
    beforeAll(() => {
      mockUseEpochTime.mockImplementation(
        () =>
          ({
            isSuccess: false,
            isLoading: true,
            isRefetching: false,
          } as UseQueryResult<Epoch>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders a loading skeleton when the data is loading", async () => {
      render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      const skeletonElement = await screen.findByTestId("skeleton");
      expect(skeletonElement).toBeInTheDocument();
    });
  });

  describe("When the API call fails", () => {
    beforeAll(() => {
      mockUseEpochTime.mockImplementation(
        () =>
          ({
            isSuccess: false,
            isLoading: false,
            isRefetching: false,
            isError: true,
          } as UseQueryResult<Epoch>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders an error message when the API call fails", async () => {
      render(
        <ChakraProvider>
          <TimeDifference />
        </ChakraProvider>
      );
      const errorElement = await screen.findByText(
        /Something went wrong while fetching data/
      );
      expect(errorElement).toBeInTheDocument();
    });
  });
});
