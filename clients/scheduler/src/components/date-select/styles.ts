import styled from 'styled-components'
import {
  BackgroundColorPropType,
  colors,
  FontColorPropType,
  HoverColorPropType,
  minWidth,
} from '@canvas/embed-common'

export const DateViewContainer = styled.div<BackgroundColorPropType>`
  background-color: ${p => p.bc};
  border-radius: 1.25rem;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: ${minWidth};
  width: 100%;
`

export const DateScrollButton = styled.button<
  FontColorPropType & HoverColorPropType
>`
  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 2.5rem;

  path {
    stroke: ${p => p.fc};
  }

  &:first-child {
    border-radius: 100% 0 0 100%;
  }

  &:last-child {
    border-radius: 0 100% 100% 0;
  }

  &:hover {
    path {
      ${p => p.hc};
    }
  }

  &:disabled {
    background-color: unset;
    path {
      stroke: ${colors.font.grey25};
    }
  }
`

export const DateSelectButton = styled.button<HoverColorPropType>`
  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  flex-grow: 1;
  justify-content: center;

  &:hover {
    h2 {
      color: ${p => p.hc};
    }
    path {
      fill: ${p => p.hc};
    }
  }
`
