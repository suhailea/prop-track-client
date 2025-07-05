import { useCallback, useState } from "react";

interface UseApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  skip?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  makeRequest: (url: string, options?: UseApiOptions) => Promise<void>;
}

export function useApi<T = unknown>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = useCallback(
    async (url: string, options: UseApiOptions = {}) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const { method = "GET", headers = {}, body, skip = false } = options;
        console.log(method, headers, body, typeof body);
        if (skip) {
          setLoading(false);
          return;
        }
        const fetchOptions: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };
        if (body) {
          fetchOptions.body =
            typeof body === "string" ? body : JSON.stringify(body);
        }
        console.log("HERE", fetchOptions);
        const response = await fetch(
          `http://localhost:3000${url}`,
          fetchOptions
        );
        const contentType = response.headers.get("content-type");
        let responseData: unknown = null;
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }
        if (!response.ok) {
          throw new Error(
            (responseData as { message?: string })?.message ||
              response.statusText ||
              "Request failed"
          );
        }
        setData(responseData as T);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, makeRequest };
}
