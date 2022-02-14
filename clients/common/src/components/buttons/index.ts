import styled from 'styled-components'
import {
  BackgroundColorPropType,
  colors,
  FontColorPropType,
  HoverColorPropType,
  MarginPropsType,
} from '../../utils'

export const Button = styled.button<
  BackgroundColorPropType &
    HoverColorPropType &
    MarginPropsType &
    FontColorPropType
>`
  background-color: ${p => p.bc};
  border: none;
  border-radius: 5px;
  color: ${p => p.fc || colors.font.white};
  font-size: 1.125rem;
  font-weight: 700;
  height: 50px;
  margin-top: ${p => p.mt || p.my || p.m};
  margin-right: ${p => p.mr || p.mx || p.m};
  margin-bottom: ${p => p.mb || p.my || p.m};
  margin-left: ${p => p.ml || p.ml || p.m};
  width: 200px;

  @media (max-width: 475px) {
    width: 138px;
  }

  &:hover {
    background-color: ${p => p.hc};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 0;

  * + * {
    margin-left: 1rem;
  }
`
