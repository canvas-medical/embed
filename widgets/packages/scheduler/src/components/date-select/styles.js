import { styles } from '@canvas/common/utils/styles'
import styled from 'styled-components'

export const DateViewContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${styles.minWidth};
  height: 40px;
  border-radius: 25px;
  background-color: ${p => p.backgroundColor || styles.default.accent};
  display: flex;
`

export const DateSelectButton = styled.button`
  background-color: unset;
  border: unset;
  margin: auto;
  display: flex;
  height: 100%;

  &:focus,
  &:hover {
    background-color: green;
  }
`

export const DateScrollButton = styled.button`
  background-color: unset;
  border: unset;
  display: flex;
  height: 100%;

  &:focus,
  &:hover {
    background-color: green;
  }

  &:disabled {
    background-color: unset;
  }
`

export const IconContainer = styled.div`
  margin: auto;
`

export const DateHeading = styled.h2`
  margin: auto;
  margin-left: 4px;
  color: #000;
`
