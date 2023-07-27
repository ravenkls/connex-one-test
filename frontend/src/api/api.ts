import { useQuery } from "@tanstack/react-query";
import { Epoch } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

// Helper function to fetch with auth header
const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> => {
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "mysecrettoken",
    },
  });
};

// Queries
export const useEpochTime = () => {
  return useQuery<Epoch>(
    ["epochTime"],
    async () => {
      const response = await fetchWithAuth(`${BASE_URL}/time`);

      if (!response.ok) {
        throw new Error("Failed to fetch epoch time");
      }

      return response.json();
    },
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
    }
  );
};

export const usePrometheusMetrics = () => {
  return useQuery<string>(
    ["prometheusMetrics"],
    async () => {
      const response = await fetchWithAuth(`${BASE_URL}/metrics`);

      if (!response.ok) {
        throw new Error("Failed to fetch prometheus metrics");
      }

      return response.text();
    },
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
    }
  );
};
