import { Scroll, Timer } from "@phosphor-icons/react"

import logoIgnite from "../../assets/logo-ignite.svg"

import { NavLink } from "react-router-dom"
import { Container } from "./style"

export function Header() {
  return (
    <Container>
      <img
        src={logoIgnite}
        alt=""
        width={40}
        height={40}
      />

      <nav>
        <NavLink
          to="/"
          title="Timer"
        >
          <Timer
            size={24}
            aria-label="Timer"
          />
        </NavLink>
        <NavLink
          to="/history"
          title="Histórico"
        >
          <Scroll
            size={24}
            aria-label="Histórico"
          />
        </NavLink>
      </nav>
    </Container>
  )
}
