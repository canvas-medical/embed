import styled from 'styled-components'
import { styles } from '../utils/styles'

// TODO - determine hover / focus styles for links
export const IconButtonLink = styled.a`
  margin: auto 8px;
  display: flex;
  padding: 8px;

  &:focus,
  &:hover {
    background-color: ${p => p.focusColor || styles.default.focus};
  }
`
