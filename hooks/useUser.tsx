import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: session, status } = useSession();
  const statusLoading = status === "loading";

  useEffect(() => {
    if (!redirectTo) return;
    if (
      (redirectTo && !redirectIfFound && session === null) ||
      (redirectIfFound && session !== null)
    )
      Router.push(redirectTo);
  }, [session, redirectIfFound, redirectTo]);

  return { session, statusLoading };
}
