import styled from 'styled-components'
import { styles } from '@canvas/common/utils/styles'

export const RadioButtonList = styled.ul`
  margin: 0;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const RadioButtonItem = styled.li`
  display: inline-block;
  margin: 7px;
  height: 40px;
  position: relative;
  width: 148px;

  @media (min-width: 666px) {
    width: 185px;
  }
`

export const RadioButtonInput = styled.input`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.01;
  z-index: 100;
`

export const RadioButtonLabel = styled.label`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${p => p.backgroundColor || styles.default.primary};
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${p => p.focusColor || styles.default.focus};
  }
`

export const RadioButtonText = styled.span`
  margin: auto;
`
