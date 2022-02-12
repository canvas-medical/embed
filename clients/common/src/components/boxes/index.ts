import styled from 'styled-components'
import { MarginPropsType } from '../..'

type BoxPropsType = {
  alignItems?: string
  flexDirection?: string
  maxWidth?: string
  width?: string
}

export const Box = styled.div<MarginPropsType & BoxPropsType>`
  align-items: ${p => p.alignItems || 'center'};
  display: flex;
  flex-direction: ${p => p.flexDirection || 'column'};
  margin-top: ${p => p.mt || p.my || p.m};
  margin-right: ${p => p.mr || p.mx || p.m};
  margin-bottom: ${p => p.mb || p.my || p.m};
  margin-left: ${p => p.ml || p.ml || p.m};
  max-width: ${p => p.maxWidth};
  text-align: center;
  width: ${p => p.width || '100%'};
`
