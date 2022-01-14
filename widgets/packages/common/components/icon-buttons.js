import styled from 'styled-components'
import { styles } from '../utils/styles'

// TODO - determine hover / focus styles for links
export const IconButtonLink = styled.a`
  align-items: center;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;

  &:focus,
  &:hover {
    background-color: ${p => p.focusColor || styles.default.focus};
  }
`
