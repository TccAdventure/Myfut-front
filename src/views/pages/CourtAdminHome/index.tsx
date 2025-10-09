import { PersonIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";

import { FabButton } from "@views/components/FabButton";
import { Spinner } from "@views/components/Spinner";
import { useCourtAdminHomeController } from "./useCourtAdminHomeController";

export function CourtAdminHome() {
  const {
    courts,
    isFetching,
    handleCreateCourt,
    goToProfile,
    goToCourtDetails,
  } = useCourtAdminHomeController();

  if (isFetching) {
    return <Spinner className="flex self-center" />;
  }

  if (!courts) {
    return null;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full w-full max-w-[504px] px-8 lg:px-0 py-8">
        <div className="flex justify-between">
          <button
            className="flex items-center justify-center h-12 w-12 bg-accent rounded-full cursor-pointer"
            onClick={goToProfile}
          >
            <PersonIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2 pb-10">
          <h2 className="text-3xl font-bold my-4">Minhas quadras</h2>

          {courts.length === 0 && (
            <h2 className="text-2xl bold">Você ainda não cadastrou nenhuma quadra!</h2>
          )}
          {courts.map((court) => (
            <div
              key={court.id}
              className="border-2 border-neutral-800 rounded-md cursor-pointer"
              onClick={() => goToCourtDetails(court.id)}
            >
              {court.imageUrl && (
                <img
                  className="rounded-tl-md rounded-tr-md h-[300px] w-[100%] object-cover border-b-2 border-neutral-800"
                  src={`${import.meta.env.VITE_API_URL}/${court.imageUrl}`}
                />
              )}

              <div className="p-4">
                <h2 className="text-2xl bold">{court.name}</h2>

                <div className="flex justify-between mt-2">
                  <p>{court.description}</p>
                  <ChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>

        <FabButton onClick={handleCreateCourt} />
      </div>
    </div>
  );
}
