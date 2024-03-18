import styled, { css } from "styled-components"

export const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
type ButtonVariant = "start" | "stop"

interface ButtonProps {
  variant?: ButtonVariant
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme["gray-100"]};

  ${props => {
    if (props.variant === "stop") {
      return css`
        background-color: ${props => props.theme["red-500"]};

        &:not(:disabled):hover {
          background-color: ${props => props.theme["red-700"]};
        }
      `
    } else {
      return css`
        background-color: ${props => props.theme["green-500"]};

        &:not(:disabled):hover {
          background-color: ${props => props.theme["green-700"]};
        }
      `
    }
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
