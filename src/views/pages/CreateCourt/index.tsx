import { Button } from "@views/components/Button";
import { GoBackButton } from "@views/components/GoBackButton";
import { Input } from "@views/components/Input";
import { Switch } from "@views/components/Switch";
import { useCreateCourtController } from "./useCreateCourtController";

export function CreateCourt() {
  const {
    register,
    handleSubmit,
    goBack,
    errors,
    isLoading,
    weekdays,
    isEditing,
  } = useCreateCourtController();

  return (
    <div className="flex flex-col py-8">
      <div className="flex items-center gap-4">
        <GoBackButton onClick={goBack} />

        <h1 className="text-2xl font-bold">{isEditing ? 'Editar' : 'Criar'} Quadra</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-[32px] flex flex-col gap-4"
      >
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          placeholder="Descrição"
          error={errors.description?.message}
          {...register('description')}
        />

        <Input
          placeholder="Link do Google Maps"
          error={errors.linkToGoogleMaps?.message}
          {...register('linkToGoogleMaps')}
        />

        <h2 className="text-xl font-bold">Endereço</h2>

        <Input
          placeholder="Cidade"
          error={errors.address?.city?.message}
          {...register('address.city')}
        />

        <Input
          placeholder="Bairro"
          error={errors.address?.neighborhood?.message}
          {...register('address.neighborhood')}
        />

        <Input
          placeholder="Rua"
          error={errors.address?.street?.message}
          {...register('address.street')}
        />

        <Input
          placeholder="Número"
          error={errors.address?.number?.message}
          {...register('address.number')}
        />

        <h2 className="text-xl font-bold">Disponibilidade</h2>

        {weekdays.map(({ weekday, name }) => (
          <div key={weekday} className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="font-bold">{name}</p>
              <Switch {...register(`availabilities.${weekday}.isActive`)} />
            </div>

            <Input
              placeholder="Dia da semana"
              error={errors.availabilities?.[weekday]?.weekday?.message}
              defaultValue={weekday}
              {...register(`availabilities.${weekday}.weekday`)}
              style={{ display: "none" }}
            />

            <div className="flex gap-2">
              <Input
                placeholder="Hora de início"
                error={errors.availabilities?.[weekday]?.startTime?.message}
                type="time"
                defaultValue={isEditing ? undefined : "18:00"}
                {...register(`availabilities.${weekday}.startTime`)}
              />

              <Input
                placeholder="Hora de fim"
                error={errors.availabilities?.[weekday]?.endTime?.message}
                type="time"
                defaultValue={isEditing ? undefined : "22:00"}
                {...register(`availabilities.${weekday}.endTime`)}
              />
            </div>
          </div>
        ))}

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isEditing ? "Salvar" : "Criar"}
        </Button>
      </form>
    </div>
  )
}
