import { useState, useEffect } from "react";
import { useURLSearchParams } from "#lib/hooks/use-url-search-params";
import { usePathname, useRouter } from "next/navigation";

export const useDraftFormIdParam = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { searchParams, createQueryString } = useURLSearchParams();
  const [draftFormId, setDraftFormId] = useState(
    searchParams.get("form-id") || ""
  );

  useEffect(() => {
    if (!draftFormId) {
      return;
    }
    const url = `${pathname}?${createQueryString("form-id", `${draftFormId}`)}`;
    router.push(url);
  }, [draftFormId]);

  return { draftFormId, setDraftFormId };
};
