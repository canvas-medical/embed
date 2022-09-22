import styled from 'styled-components'
import {
  BackgroundColorPropType,
  MarginPropsType,
  maxWidth,
  minWidth,
} from '../../utils'

type AppContainerPropsType = {
  fontFamily?: string
}

type BoxPropsType = {
  alignItems?: string
  flexDirection?: string
  justifyContent?: string
  maxWidth?: string
  width?: string
}

export const AppContainer = styled.div<AppContainerPropsType>`
  background-color: white;
  font-family: ${p =>
    p.fontFamily ? `${p.fontFamily}` : "'Roboto', sans-serif"};
  height: 100vh;
  overflow: auto;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  min-width: ${minWidth};
  max-width: ${maxWidth};
  padding: 0 16px;
  width: 100%;
`

export const Box = styled.div<MarginPropsType & BoxPropsType>`
  align-items: ${p => p.alignItems || 'center'};
  justify-content: ${p => p.justifyContent || 'normal'};
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

export const Fieldset = styled.fieldset<BackgroundColorPropType>`
  background-color: ${p => p.bc};
  border: none;
  border-radius: 5px;
  margin: 0 0 1rem;
  padding: 1rem;
`

export const AccentBox = styled(Box)<BackgroundColorPropType>`
  background-color: ${p => p.bc};
  border-radius: 5px;
  padding: 1rem;
`
export const VerticalDivider = styled.span`
  border-inline-end: 1px solid black;
  height: 50px;
  margin-inline: 16px;
`
