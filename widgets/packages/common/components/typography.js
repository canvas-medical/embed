import styled from 'styled-components'
import { margin } from '../utils'

export const H2 = styled.h2`
  ${margin}

  font-size: 1.125rem;
  font-weight: 700;
`

export const H3 = styled.h3`
  ${margin}

  font-size: 1rem;
  font-weight: 700;
`

export const Span = styled.span`
  ${margin}

  color: var(--color, #000);
  font-size: 1rem;
`

export const ScreenReaderText = styled.span`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`
