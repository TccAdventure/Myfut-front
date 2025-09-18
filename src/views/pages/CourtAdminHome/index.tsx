import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@views/components/Button";
import { Spinner } from "@views/components/Spinner";
import { ChevronRight, PlusIcon } from "lucide-react";
import { useCourtAdminHomeController } from "./useCourtAdminHomeController";

export function CourtAdminHome() {
  const { courts, isFetching, isSuccess, handleLogout, handleCreateCourt } = useCourtAdminHomeController();

  if (isFetching) {
    return <Spinner className="flex self-center" />;
  }

  if (!isSuccess || !courts) {
    return null;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full w-full max-w-[504px] px-8 lg:px-0 relative">

        <div className="flex justify-between mt-4">
          <button className="flex items-center justify-center h-12 w-12 bg-accent rounded-full cursor-pointer">
            <PersonIcon />
          </button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl my-4">Minhas quadras</h2>

          {courts.map((court) => (
            <div key={court.id} className="border-2 border-primary/30 rounded-md p-4">
              <h2 className="text-2xl bold">{court.name}</h2>

              <div className="flex justify-between mt-2">
                <p>{court.description}</p>
                <button className="cursor-pointer">
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-4 bottom-4">
          <button
            className="flex items-center justify-center h-12 w-12 bg-primary rounded-full cursor-pointer"
            onClick={handleCreateCourt}
          >
            <PlusIcon />
          </button>
        </div>

      </div>
    </div>
  );
}
