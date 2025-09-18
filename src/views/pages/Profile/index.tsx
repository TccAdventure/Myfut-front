import { Button } from "@views/components/Button";
import { GoBackButton } from "@views/components/GoBackButton";
import { useProfileController } from "./useProfileController";

export function Profile() {
  const {
    user,
    role,
    goBack,
    handleLogout,
  } = useProfileController();

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full max-w-[504px] px-8 lg:px-0 gap-4 py-8">
        <div className="flex items-center gap-4">
          <GoBackButton onClick={goBack} />

          <h1 className="text-2xl font-bold">Perfil</h1>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Meus dados</h2>
          <p>Nome: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {role}</p>
        </div>

        <Button onClick={handleLogout} variant="danger">Sair</Button>
      </div>
    </div>
  )
}
