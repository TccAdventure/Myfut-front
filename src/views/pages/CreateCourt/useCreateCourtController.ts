import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { routes } from "@app/Router/routes";
import { courtAdminService } from "@app/services/courtAdminService";
import type { CreateCourtBody } from "@app/services/courtAdminService/create";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  address: z.object({
    country: z.string().default("BR"),
    state: z.string().default("SP"),
    city: z.string().nonempty('Cidade é obrigatória'),
    neighborhood: z.string().nonempty('Bairro é obrigatório'),
    street: z.string().nonempty('Rua é obrigatório'),
    number: z.coerce.number({ invalid_type_error: 'Deve ser um número' }).min(1, "Deve ser maior que zero").nonnegative('Número é obrigatório').transform(value => +value),
  }),
  availabilities: z.object({
    weekday: z.coerce.number({ invalid_type_error: 'Deve ser um número' }).nonnegative('Dia da semana é obrigatório'),
    startTime: z.string().nonempty('Hora de início é obrigatório'),
    endTime: z.string().nonempty('Hora de fim é obrigatório'),
    isActive: z.coerce.boolean(),
  }).array(),
});

type FormData = z.infer<typeof schema>;

const weekdays = [
  { weekday: 0, name: "Domingo" },
  { weekday: 1, name: "Segunda" },
  { weekday: 2, name: "Terça" },
  { weekday: 3, name: "Quarta" },
  { weekday: 4, name: "Quinta" },
  { weekday: 5, name: "Sexta" },
  { weekday: 6, name: "Sábado" },
];

export function useCreateCourtController() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: CreateCourtBody) => {
      return courtAdminService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['court', 'getAll'] });
      navigate(routes.courtAdminHome, { replace: true });
    } catch {
      toast.error('Ocorreu um erro ao criar a sua quadra!');
    }
  });

  function goBack() {
    navigate(-1);
  }

  return {
    register,
    errors,
    handleSubmit,
    isLoading,
    goBack,
    weekdays,
  }
}
