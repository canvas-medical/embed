import styled from 'styled-components'
import {
  colors,
  FontColorPropType,
  HoverColorPropType,
  MarginPropsType,
} from '../../utils'

export const IconButtonLink = styled.a<
  FontColorPropType & HoverColorPropType & MarginPropsType
>`
  align-items: center;
  display: flex;
  margin-top: ${p => p.mt || p.my || p.m};
  margin-right: ${p => p.mr || p.mx || p.m};
  margin-bottom: ${p => p.mb || p.my || p.m};
  margin-left: ${p => p.ml || p.ml || p.m};
  padding: 0.5rem;
  position: relative;
  z-index: 2;

  path {
    stroke: ${p => p.fc};
  }

  &:hover {
    path {
      stroke: ${p => p.hc};
    }
  }
`

export const IconButton = styled.button<
  FontColorPropType & HoverColorPropType & MarginPropsType
>`
  align-items: center;
  background-color: unset;
  border: unset;
  display: flex;
  margin-top: ${p => p.mt || p.my || p.m};
  margin-right: ${p => p.mr || p.mx || p.m};
  margin-bottom: ${p => p.mb || p.my || p.m};
  margin-left: ${p => p.ml || p.ml || p.m};
  padding: 0.5rem;
  position: relative;
  z-index: 2;
  path {
    stroke: ${p => p.fc};
  }
  &:hover {
    path {
      stroke: ${p => p.hc};
    }
  }
  &:disabled {
    path {
      stroke: ${colors.font.grey25};
    }
  }
`
