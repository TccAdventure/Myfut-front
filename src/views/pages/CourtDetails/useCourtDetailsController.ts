import { useNavigate, useParams } from "react-router-dom";

import { useGetCourtById } from "@app/hooks/useGetCourtById";

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
  const params = useParams();
  const courtId = params?.courtId ?? "";
  const { court, isFetching } = useGetCourtById(courtId);
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return {
    court,
    isFetching,
    weekdays,
    goBack,
  }
}
