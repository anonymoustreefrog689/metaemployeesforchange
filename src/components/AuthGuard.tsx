"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === "/password") {
      setAuthorized(true);
      return;
    }
    const authed = localStorage.getItem("site_auth") === "granted";
    if (!authed) {
      router.replace("/password");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) return null;
  return <>{children}</>;
}
