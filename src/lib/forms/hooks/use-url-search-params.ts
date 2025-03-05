import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useURLSearchParams = (): {
  searchParams: ReadonlyURLSearchParams;
  createQueryString: (key: string, value: string) => string;
} => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      //TODO remove ts-ignore
      //@ts-ignore
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );
  //TODO remove ts-ignore
  //@ts-ignore
  return { createQueryString, searchParams };
};
