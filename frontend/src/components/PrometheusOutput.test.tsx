import { ChakraProvider } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePrometheusMetrics } from "../api/api";
import PrometheusOutput from "./PrometheusOutput";

jest.mock("../api/api", () => ({
  usePrometheusMetrics: jest.fn(),
}));

const mockUsePrometheusMetrics = usePrometheusMetrics as jest.MockedFunction<
  typeof usePrometheusMetrics
>;

describe("PrometheusOutput", () => {
  describe("When the API call is successful", () => {
    beforeAll(() => {
      mockUsePrometheusMetrics.mockImplementation(
        () =>
          ({
            data: "test data",
            isLoading: false,
            isRefetching: false,
          } as UseQueryResult<string>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders the data returned by the API", async () => {
      render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      const dataElement = await screen.findByText("test data");
      expect(dataElement).toBeInTheDocument();
    });
  });

  describe("When the API call is loading", () => {
    beforeAll(() => {
      mockUsePrometheusMetrics.mockImplementation(
        () =>
          ({
            isLoading: true,
            isRefetching: false,
          } as UseQueryResult<string>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders a loading skeleton when the data is loading", async () => {
      render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      const skeletonElement = await screen.findByTestId("skeleton");
      expect(skeletonElement).toBeInTheDocument();
    });
  });

  describe("When the API call fails", () => {
    beforeAll(() => {
      mockUsePrometheusMetrics.mockImplementation(
        () =>
          ({
            isError: true,
          } as UseQueryResult<string>)
      );
    });

    it("matches the snapshot", () => {
      const { container } = render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      expect(container).toMatchSnapshot();
    });

    it("renders an error message when the API call fails", async () => {
      render(
        <ChakraProvider>
          <PrometheusOutput />
        </ChakraProvider>
      );
      const errorElement = await screen.findByText(
        /Something went wrong while fetching data/
      );
      expect(errorElement).toBeInTheDocument();
    });
  });
});
