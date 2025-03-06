import { useState, useEffect } from "react";
import { useURLSearchParams } from "#lib/hooks/use-url-search-params";
import { usePathname, useRouter } from "next/navigation";

export const useDraftFormId = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { searchParams, createQueryString } = useURLSearchParams();
  const [draftFormId, setDraftFormId] = useState(
    searchParams.get("form-id") || ""
  );

  useEffect(() => {
    console.log("hook draftFormId", draftFormId);
    if (!draftFormId) {
      return;
    }
    const url = `${pathname}?${createQueryString("form-id", `${draftFormId}`)}`;
    router.push(url);
  }, [draftFormId]);

  return { draftFormId, setDraftFormId };
};
