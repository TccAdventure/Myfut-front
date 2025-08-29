import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn, user } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (signedIn && !isPrivate) {
    if (user?.role === 'COURT_ADMIN') {
      return <Navigate to="/court-admin-home" replace />
    }

    return <Navigate to="/" replace />
  }

  return <Outlet />
}
