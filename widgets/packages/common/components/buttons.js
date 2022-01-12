import styled from 'styled-components'
import { styles } from '..'

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${p =>
    p.backgroundColor || styles.buttons.primary.background};
  width: 200px;
  height: 50px;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: ${p => p.mt || null};
  margin-bottom: ${p => p.mb || null};
  margin-left: ${p => p.ml || null};
  margin-right: ${p => p.mr || null};

  &:focus,
  &:hover {
    background-color: ${p => p.focusColor || styles.buttons.primary.focus};
  }
`

export const OutlineButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #595959;
  color: #000;

  &:focus,
  &:hover {
    background-color: #a8a8a8;
  }
`
