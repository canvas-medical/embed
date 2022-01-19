import {
  accentBackgoundColor,
  hoverAndFocusBackgroundColor,
  styles,
} from '@canvas/common'
import styled from 'styled-components'

export const DateViewContainer = styled.div`
  ${accentBackgoundColor}
  border-radius: 1.25rem;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: ${styles.minWidth};
  width: 100%;
`

export const DateSelectButton = styled.button`
  ${hoverAndFocusBackgroundColor}

  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  flex-grow: 1;
  justify-content: center;

  &:focus,
  &:hover {
    h2 {
      color: #fff;
    }

    path {
      fill: #fff;
    }
  }
`

export const DateScrollButton = styled.button`
  ${hoverAndFocusBackgroundColor}

  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 2.5rem;

  &:first-child {
    border-radius: 100% 0 0 100%;
  }

  &:last-child {
    border-radius: 0 100% 100% 0;
  }

  &:focus,
  &:hover {
    path {
      stroke: #fff;
    }
  }

  &:disabled {
    background-color: unset;
  }
`

export const IconContainer = styled.div``

export const DateHeading = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-left: 10px;
  color: #000;
`
