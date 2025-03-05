import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useURLSearchParams = (): {
  searchParams: ReadonlyURLSearchParams;
  createQueryString: (key: string, value: string) => string;
} => {
  const searchParams = useSearchParams() ?? new URLSearchParams();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );
  return {
    createQueryString,
    searchParams: searchParams as ReadonlyURLSearchParams,
  };
};
