import { Container, HistoryList, Status } from "./style"

export function History() {
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
            {["yellow", "red", "green"].map(item => (
              <tr key={item}>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor={item}>Concluído</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
