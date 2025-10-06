import { Link } from "lucide-react";

import { ConfirmScheduleModal } from "@views/components/ConfirmScheduleModal";
import { GoBackButton } from "@views/components/GoBackButton";
import { Spinner } from "@views/components/Spinner";
import { useCourtDetailsController } from "./useCourtDetailsController";

export function CourtDetails() {
  const {
    court,
    isFetching,
    weekdays,
    isConfirmScheduleModalOpen,
    isScheduleLoading,
    alreadyScheduled,
    goBack,
    handleSchedule,
    handleOpenScheduleModal,
    handleCloseScheduleModal,
    handleSetSelectedSchedule,
    getNewCourtAvailabilities,
  } = useCourtDetailsController();

  if (isFetching) {
    return <Spinner className="flex self-center" />;
  }

  if (!court) {
    return <p>Ocorreu um erro ao carregar os detalhes da quadra</p>;
  }

  function renderTimes(date: Date, startTime: string, endTime: string) {
    const [startTimeHour] = startTime.split(":");
    const [endTimeHour] = endTime.split(":");

    const timeRange = 1 + +endTimeHour - +startTimeHour;
    const timesArray = [...Array(timeRange).keys()];

    return timesArray.map((i) => {
      const newTime = `${+startTimeHour + i}:00`;

      const [hours, minutes] = newTime.split(":");
      const newDate = new Date(date);
      newDate.setHours(+hours);
      newDate.setMinutes(+minutes);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      return (
        <button
          key={i}
          onClick={() => {
            handleSetSelectedSchedule({ date, startTime: newTime, courtId: court!.id });
            handleOpenScheduleModal();
          }}
          className="w-16 h-10 bg-violet-400 hover:bg-violet-500 rounded-md cursor-pointer disabled:bg-gray-500 disabled:cursor-default"
          disabled={alreadyScheduled?.includes(newDate.getTime())}
        >
          {newTime}
        </button>
      );
    });
  }

  return (
    <div className="h-screen">
      <ConfirmScheduleModal
        open={isConfirmScheduleModalOpen}
        isLoading={isScheduleLoading}
        onConfirm={handleSchedule}
        onClose={handleCloseScheduleModal}
        title="Deseja agendar esse horário?"
        description="Ao agendar a quadra, o horário escolhido ficará reservado para você."
      />

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
                  <h3 className="font-bold mr-2">{weekdays[weekday]} ({date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})</h3>
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
