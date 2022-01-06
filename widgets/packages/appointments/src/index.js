import { h, render } from "preact"
import { Demo } from "@canvas/common"
import styles from "./styles.css"
import styled, { StyleSheetManager } from "styled-components"

const StyledExample = styled.div`
  background-color: green;
`

const App = ({ rootId }) => {
  return (
    <StyleSheetManager target={document.querySelector(`#${rootId}`).shadowRoot}>
      <StyledExample>
        <h1>Appointments</h1>
        <span>This is the appointments app</span>
        <Demo text="electric boogie" />
      </StyledExample>
    </StyleSheetManager>
  )
}

export const init = ({ rootId }) => {
  const appRoot = document.querySelector(`#${rootId}`)
  appRoot.attachShadow({
    mode: "open",
  })

  const styleTag = document.createElement("style")
  styleTag.innerHTML = styles
  appRoot.shadowRoot.appendChild(styleTag)

  render(<App rootId={rootId} />, appRoot.shadowRoot)
}
