import styled from 'styled-components'
import { hoverAndFocusBackgroundColor, margin } from '../utils/styles'

// TODO - determine hover / focus styles for links
export const IconButtonLink = styled.a`
  ${hoverAndFocusBackgroundColor}

  align-items: center;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
`

export const IconButton = styled.button`
  ${hoverAndFocusBackgroundColor}
  ${margin}

  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
`
