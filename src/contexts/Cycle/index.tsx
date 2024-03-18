import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"

import { differenceInSeconds } from "date-fns"
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../../reducers/cycles/actions"
import { cyclesReducer } from "../../reducers/cycles/reducer"

interface CreateCycleData {
  task: string
  minutesAmount: number
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    initialState => {
      const storageStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state",
      )

      if (storageStateAsJSON) return JSON.parse(storageStateAsJSON)

      return initialState
    },
  )

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem("@ignite-timer:cycles-state", stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
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

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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
