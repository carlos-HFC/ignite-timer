import { useFormContext } from "react-hook-form"

import { useCycles } from "../../contexts/Cycle"

import { FormContainer, MinutesAmountInput, TaskInput } from "./style"

export function NewCycleForm() {
  const { activeCycle } = useCycles()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions" />

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
