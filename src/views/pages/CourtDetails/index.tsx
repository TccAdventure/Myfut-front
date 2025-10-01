import { Link } from "lucide-react";

import type { CourtDetails } from "@app/entities/Court";
import { GoBackButton } from "@views/components/GoBackButton";
import { Spinner } from "@views/components/Spinner";
import { useCourtDetailsController } from "./useCourtDetailsController";

export function CourtDetails() {
  const {
    court,
    isFetching,
    weekdays,
    goBack,
  } = useCourtDetailsController();

  if (isFetching) {
    return <Spinner className="flex self-center" />;
  }

  if (!court) {
    return <p>Ocorreu um erro ao carregar os detalhes da quadra</p>;
  }

  function handleSchedule(time: string) {
    console.log(time)
  }

  function renderTimes(date: string, startTime: string, endTime: string) {
    const [startTimeHour] = startTime.split(":");
    const [endTimeHour] = endTime.split(":");

    const timeRange = 1 + +endTimeHour - +startTimeHour;
    const timesArray = [...Array(timeRange).keys()];

    return timesArray.map((i) => {
      const newTime = `${+startTimeHour + i}:00 `;
      return (
        <button
          key={i}
          onClick={() => handleSchedule(`${date} ${newTime}`)}
          className="w-16 h-10 bg-violet-400 hover:bg-violet-500 rounded-md cursor-pointer"
        >
          {newTime}
        </button>
      );
    });
  }

  function getNewCourtAvailabilities() {
    if (!court?.courtAvailability) return;

    const tmpCourtAvailability = [...court.courtAvailability];

    const now = new Date();

    const today = new Date(now).getDay();

    const newCourtAvailability: { date?: string } & CourtDetails["courtAvailability"] = []
    const availabilityRest: CourtDetails["courtAvailability"] = []

    tmpCourtAvailability.forEach((availability) => {
      if (availability.weekday > today) {
        newCourtAvailability.push(availability);
      } else {
        availabilityRest.push(availability);
      }
    })

    availabilityRest.forEach((availability) => {
      newCourtAvailability.push(availability);
    })

    return newCourtAvailability.map((availability, index) => {
      const dateToSet = now.getDate();

      return {
        ...availability,
        date: new Date(new Date().setDate(dateToSet + index + 1)).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      }
    });
  }


  return (
    <div className="h-screen">
      <div className="flex flex-col h-full w-full max-w-[504px] px-8 lg:px-0 relative py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <GoBackButton onClick={goBack} />

            <h1 className="text-2xl font-bold">{court.name}</h1>
          </div>
        </div>

        <div className="mt-8">
          <p>{court.description}</p>

          <h2 className="text-2xl font-bold py-4">Endereço</h2>
          <p>Estado: {court.courtAddress.state}</p>
          <p>Cidade: {court.courtAddress.city}</p>
          <p>Bairro: {court.courtAddress.neighborhood}</p>
          <p>Rua: {court.courtAddress.street}</p>
          <p>Número: {court.courtAddress.number}</p>

          {court.linkToGoogleMaps && (
            <a
              className="flex items-center gap-2 text-blue-400 cursor-pointer"
              target="_blank"
              href={court.linkToGoogleMaps}
            >
              <Link size={16} />
              <p>Ver no Google Maps</p>
            </a>
          )}

          <h2 className="text-2xl font-bold py-4">Disponibilidade</h2>

          <div className="flex flex-col gap-4">
            {getNewCourtAvailabilities()?.map(({ weekday, startTime, endTime, isActive, date }) =>
              isActive
              ? (
                <div key={weekday} className="grid grid-cols-5">
                  <h3 className="font-bold mr-2">{weekdays[weekday]} ({date})</h3>
                  <div className="flex gap-2 col-span-4 flex-wrap">{renderTimes(date, startTime, endTime)}</div>
                </div>
              )
              : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
