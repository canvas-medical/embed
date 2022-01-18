import styled from 'styled-components'
import { hoverAndFocusColor } from '../utils/styles'

// TODO - determine hover / focus styles for links
export const IconButtonLink = styled.a`
  ${hoverAndFocusColor}

  align-items: center;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
`
