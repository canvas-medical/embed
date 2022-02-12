import styled from 'styled-components'
import { FontColorPropType } from '../../utils'

export const H1 = styled.h1<FontColorPropType>`
  color: ${p => p.fc};
  font-size: 1.125rem;
  font-weight: 700;
  margin: auto;
  position: relative;
`
