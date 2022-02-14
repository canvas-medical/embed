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

export const H2 = styled.h2<FontColorPropType>`
  color: ${p => p.fc};
  font-size: 1.125rem;
  font-weight: 700;
`

export const H3 = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`

export const Legend = styled.legend`
  float: left;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0;
  width: fit-content;
`

export const Span = styled.span<FontColorPropType & SpanPropsType>`
  color: ${p => p.fc || colors.font.grey75};
  font-size: ${p => p.fontSize || '1rem'};
  text-align: center;
`

export const ScreenReaderText = styled.span`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`
