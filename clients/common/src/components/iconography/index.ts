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
  mt: ${p => p.mt || p.my || p.m};
  mr: ${p => p.mr || p.mx || p.m};
  mb: ${p => p.mb || p.my || p.m};
  ml: ${p => p.ml || p.ml || p.m};
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

  $:disabled {
    path {
      stroke: ${colors.font.grey25};
    }
  }
`
