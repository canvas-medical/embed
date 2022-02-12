import styled from 'styled-components'
import { colors, FontColorPropType } from '../../utils'

type SpanPropsType = {
  fontSize?: string
}

export const H1 = styled.h1<FontColorPropType>`
  color: ${p => p.fc};
  font-size: 1.125rem;
  font-weight: 700;
  margin: auto;
  position: relative;
`

export const Span = styled.span<FontColorPropType & SpanPropsType>`
  color: ${p => p.fc || colors.font.grey75};
  font-size: ${p => p.fontSize || '1rem'};
`
