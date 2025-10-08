import { PersonIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";

import { Select } from "@views/components/Select";
import { Spinner } from "@views/components/Spinner";
import { useHomeController } from "./useHomeController";

export function Home() {
  const {
    courts,
    isFetching,
    availableCitiesOptions,
    selectedCity,
    goToProfile,
    goToCourtDetails,
    handleCityChange,
  } = useHomeController();

  if (isFetching) {
    return <Spinner className="flex self-center" />;
  }

  if (!courts) {
    return <p>Ocorreu um erro ao buscar as quadras disponíveis</p>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full w-full max-w-[504px] px-8 lg:px-0 relative py-8">
        <div className="flex justify-between">
          <button
            className="flex items-center justify-center h-12 w-12 bg-accent rounded-full cursor-pointer"
            onClick={goToProfile}
          >
            <PersonIcon />
          </button>
        </div>

        <div className="flex items-center justify-center mt-4 gap-2">
          <h2>Você está em:</h2>
          <div className="flex-1">
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Cidade"
              options={availableCitiesOptions}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl my-4">Na sua cidade</h2>

          {courts.length === 0 && (
            <h2 className="text-2xl bold">Nenhuma quadra encontrada na sua cidade!</h2>
          )}
          {courts?.map((court) => (
            <div
              key={court.id}
              className="border-2 border-primary/30 rounded-md p-4 cursor-pointer"
              onClick={() => goToCourtDetails(court.id)}
            >
              <h2 className="text-2xl bold">{court.name}</h2>

              <div className="flex justify-between mt-2">
                <p>{court.description}</p>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
