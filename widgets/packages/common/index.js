import { h } from "preact"
import styled from "styled-components"

export const Demo = ({ text }) => (
  <span>{`This is a demo. Here's some text: ${text}`}</span>
)

export const StyledDemo = styled.span`
  color: #fff;
  font-weight: 700;
`
