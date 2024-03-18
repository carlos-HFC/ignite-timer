import { PropsWithChildren, createContext, useContext, useState } from "react"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextProps {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished(): void
  setSecondsPassed(seconds: number): void
  createNewCycle(data: CreateCycleData): void
  interruptCurrentCycle(): void
}

interface CyclesProviderProps extends PropsWithChildren {}

export const CyclesContext = createContext({} as CyclesContextProps)

export const useCycles = () => useContext(CyclesContext)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles(prev => {
      return prev.map(item => {
        if (item.id === activeCycleId) {
          return { ...item, finishedDate: new Date() }
        }

        return item
      })
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles(prev => [...prev, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    setCycles(prev => {
      return prev.map(item => {
        if (item.id === activeCycleId) {
          return { ...item, interruptedDate: new Date() }
        }

        return item
      })
    })

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
