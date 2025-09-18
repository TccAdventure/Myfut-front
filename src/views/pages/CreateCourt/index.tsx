import { Button } from "@views/components/Button";
import { Input } from "@views/components/Input";
import { Switch } from "@views/components/Switch";

import { GoBackButton } from "@views/components/GoBackButton";
import { useCreateCourtController } from "./useCreateCourtController";

export function CreateCourt() {
  const {
    register,
    errors,
    handleSubmit,
    isLoading,
    goBack,
    weekdays,
  } = useCreateCourtController();

  return (
    <div className="flex flex-col py-8">
      <div className="flex items-center gap-4">
        <GoBackButton onClick={goBack} />

        <h1 className="text-2xl font-bold">Criar Quadra</h1>
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

        <h2>Endereço</h2>

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

        <h2>Disponibilidade</h2>

        {weekdays.map(({ weekday, name }) => (
          <div key={weekday} className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h3>{name}</h3>
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
                defaultValue={"18:00"}
                {...register(`availabilities.${weekday}.startTime`)}
              />

              <Input
                placeholder="Hora de fim"
                error={errors.availabilities?.[weekday]?.endTime?.message}
                type="time"
                defaultValue={"22:00"}
                {...register(`availabilities.${weekday}.endTime`)}
              />
            </div>
          </div>
        ))}

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </div>
  )
}
