import { zodResolver } from "@hookform/resolvers/zod"
import { HandPalm, Play } from "@phosphor-icons/react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Countdown } from "../../components/Countdown"
import { NewCycleForm } from "../../components/NewCycleForm"

import { useCycles } from "../../contexts/Cycle"

import { Button, Container } from "./style"

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    reset()
  }

  const task = watch("task")
  const IS_SUBMIT_DISABLED = !task

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <Button
            variant="stop"
            type="button"
            onClick={interruptCurrentCycle}
          >
            <HandPalm size={24} />
            Interromper
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={IS_SUBMIT_DISABLED}
          >
            <Play size={24} />
            Começar
          </Button>
        )}
      </form>
    </Container>
  )
}
