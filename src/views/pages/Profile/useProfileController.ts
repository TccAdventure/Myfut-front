import { useAuth } from "@app/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function useProfileController() {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const role = user?.role === "COURT_ADMIN" ? "Administrador de Quadras" : "Usuário"

  function goBack() {
    navigate(-1);
  }

  function handleLogout() {
    signout();
  }

  return {
    user,
    role,
    goBack,
    handleLogout,
  }
}
