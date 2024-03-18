import { formatDistanceToNow } from "date-fns"

import { useCycles } from "../../contexts/Cycle"

import { Container, HistoryList, Status } from "./style"

export function History() {
  const { cycles } = useCycles()

  return (
    <Container>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(item => (
              <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(item.startDate, { addSuffix: true })}
                </td>
                <td>
                  {item.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {item.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!item.interruptedDate && !item.finishedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
