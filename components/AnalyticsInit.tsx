"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/utils/analytics";

export default function AnalyticsInit() {
  const didStart = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!didStart.current) {
      didStart.current = true;
      trackEvent({
        name: "SessionStarted",
        properties: {
          landing_page: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
          is_logged_in: false,
        },
      });
    }
  }, [pathname, searchParams]);

  return null;
}

