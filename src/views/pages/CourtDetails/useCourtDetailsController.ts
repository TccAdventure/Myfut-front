import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UUID } from "node:crypto";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import type { CourtDetails } from "@app/entities/Court";
import { useGetCourtById } from "@app/hooks/useGetCourtById";
import { scheduleService } from "@app/services/scheduleService";
import type { CreateScheduleBody } from "@app/services/scheduleService/create";

const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function useCourtDetailsController() {
  const [isConfirmScheduleModalOpen, setIsConfirmScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<{ date: Date, startTime: string, courtId: UUID } | null>(null);

  const params = useParams();
  const courtId = params?.courtId ?? "";
  const { court, isFetching } = useGetCourtById(courtId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const alreadyScheduled = court?.schedules.map((schedule) => new Date(schedule.date).getTime());

  const { mutateAsync: createSchedule, isPending: isScheduleLoading } = useMutation({
    mutationFn: async (data: CreateScheduleBody) => {
      return await scheduleService.create(data);
    },
  });

  function goBack() {
    navigate(-1);
  }

  async function handleSchedule() {
    if (!selectedSchedule) return;

    try {
      const { date, startTime, courtId } = selectedSchedule;

      const [hours, minutes] = startTime.split(":");
      const newDate = new Date(date);
      newDate.setHours(+hours);
      newDate.setMinutes(+minutes);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);

      await createSchedule({ date: newDate, courtId });
      queryClient.invalidateQueries({ queryKey: ['courts', courtId] });
      handleCleanSelectedSchedule();
      handleCloseScheduleModal();
    } catch {
      toast.error("Ocorreu um erro ao agendar o seu horário!");
      handleCleanSelectedSchedule();
      handleCloseScheduleModal();
    }
  }

  function handleOpenScheduleModal() {
    setIsConfirmScheduleModalOpen(true);
  }

  function handleCloseScheduleModal() {
    handleCleanSelectedSchedule();
    setIsConfirmScheduleModalOpen(false);
  }

  function handleSetSelectedSchedule({ date, startTime, courtId }: { date: Date, startTime: string, courtId: UUID }) {
    setSelectedSchedule({ date, startTime, courtId });
  }

  function handleCleanSelectedSchedule() {
    setSelectedSchedule(null);
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
        date: new Date(new Date().setDate(dateToSet + index + 1)),
      }
    });
  }

  return {
    court,
    isFetching,
    weekdays,
    isScheduleLoading,
    isConfirmScheduleModalOpen,
    alreadyScheduled,
    goBack,
    handleSchedule,
    handleOpenScheduleModal,
    handleCloseScheduleModal,
    handleSetSelectedSchedule,
    handleCleanSelectedSchedule,
    getNewCourtAvailabilities,
  }
}
