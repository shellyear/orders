import { useCallback, useState } from "react";

export type MutationStatus = "idle" | "loading" | "success" | "error";

interface UseMutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

interface UseMutationResult<TData> {
  mutate: (variables: any) => Promise<void>;
  status: "idle" | "loading" | "success" | "error";
  data: TData | null;
  error: Error | null;
  reset: () => void
}

export const useMutation = <TData>(
  mutationFn: (variables: any) => Promise<TData>,
  options: UseMutationOptions<TData> = {}
): UseMutationResult<TData> => {
  const [status, setStatus] = useState<MutationStatus>("idle");
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: any) => {
    setStatus("loading");
    try {
      const result = await mutationFn(variables);
      setData(result);
      setStatus("success");
      if (options.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err: any) {
      setError(err);
      setStatus("error");
      if (options.onError) {
        options.onError(err);
      }
    }
  };
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus("idle");
  }, []);

  return {
    mutate,
    reset,
    status,
    data,
    error,
  };
};
