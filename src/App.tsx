import { setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import { CyclesProvider } from "./contexts/Cycle"
import { Router } from "./routes"

import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

setDefaultOptions({
  locale: ptBR,
})

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
