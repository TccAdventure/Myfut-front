import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { availableCities } from "@app/constants/availableCities";
import { routes } from "@app/Router/routes";
import { courtAdminService } from "@app/services/courtAdminService";
import type { CreateCourtBody } from "@app/services/courtAdminService/create";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  linkToGoogleMaps: z.string(),
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
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();

  const courtId = params?.courtId;
  const isEditing = !!courtId;

  const availableCitiesOptions = useMemo(() => {
    return availableCities.map((city) => ({
      value: city,
      label: city,
    }));
  }, []);

  const { data: detailsData } = useQuery({
    queryKey: ["courts", courtId],
    queryFn: async () => {
      if (courtId) {
        const data = await courtAdminService.getById(courtId);
        reset(data);
        return data;
      }
    },
    enabled: isEditing,
    staleTime: Infinity,
  });

  const { mutateAsync: createMutation, isPending: isCreateLoading } = useMutation({
    mutationFn: async (data: CreateCourtBody) => {
      return courtAdminService.create(data);
    }
  });

  const { mutateAsync: updateMutation, isPending: isUpdateLoading } = useMutation({
    mutationFn: async (data: CreateCourtBody) => {
      return courtId && courtAdminService.update(courtId, data);
    }
  });

  const { mutateAsync: removeCourtMutation, isPending: isDeleteLoading } = useMutation(courtAdminService.remove);

  const { mutateAsync: uploadImageMutation, isPending: isUploadLoading } = useMutation(courtAdminService.uploadFile);

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: {
      name: detailsData?.name ?? "",
      description: detailsData?.description ?? "",
      linkToGoogleMaps: detailsData?.linkToGoogleMaps ?? "",
      address: {
        country: detailsData?.courtAddress.country ?? "BR",
        state: detailsData?.courtAddress.state ?? "SP",
        city: detailsData?.courtAddress.city ?? "",
        neighborhood: detailsData?.courtAddress.neighborhood ?? "",
        street: detailsData?.courtAddress.street ?? "",
        number: detailsData?.courtAddress.number ?? "" as unknown as number,
      },
      availabilities: detailsData?.courtAvailability?.sort((a, b) => a.weekday - b.weekday)?.map(({ weekday, startTime, endTime, isActive }) => ({
        weekday,
        startTime,
        endTime,
        isActive,
      })) ?? [],
    },
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (isEditing) {
        await updateMutation(data);

        if (courtId && selectedImage) {
          const formData = new FormData();
          formData.append('file', selectedImage)
          await uploadImageMutation({ courtId, body: formData});
        }

        queryClient.invalidateQueries({ queryKey: ['courts', courtId] });
      } else {
        const { id } = await createMutation(data);

        if (id && selectedImage) {
          const formData = new FormData();
          formData.append('file', selectedImage)
          await uploadImageMutation({ courtId: id, body: formData });
        }
      }

      queryClient.invalidateQueries({ queryKey: ['courtAdmin', 'getAll'] });

      toast.success(`Quadra ${isEditing ? "editada" : "criada"} com sucesso!`);

      if (!isEditing) {
        navigate(routes.courtAdminHome, { replace: true });
      }
    } catch {
      toast.error(`Ocorreu um erro ao ${isEditing ? "editar" : "criar"} a sua quadra!`);
    }
  });

  async function handleDelete() {
    if (!courtId) return;

    try {
      await removeCourtMutation(courtId);

      queryClient.invalidateQueries({ queryKey: ['courtAdmin', 'getAll'] });
      toast.success('A quadra foi deletada com sucesso!');
      handleCloseDeleteModal();
      navigate(routes.courtAdminHome, { replace: true });
    } catch {
      toast.error('Erro ao deletar a quadra!');
    }
  }

  function goBack() {
    navigate(-1);
  }

  function handleOpenDeleteModal() {
    setIsConfirmDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsConfirmDeleteModalOpen(false);
  }

  function handleFileChange(image?: File) {
    setSelectedImage(image);
  }

  return {
    errors,
    isLoading: isCreateLoading || isUpdateLoading,
    weekdays,
    isEditing,
    control,
    isConfirmDeleteModalOpen,
    isDeleteLoading,
    isUploadLoading,
    availableCitiesOptions,
    register,
    handleSubmit,
    goBack,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleFileChange,
  }
}
