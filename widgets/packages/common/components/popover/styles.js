import styled from 'styled-components'

export const PopoverBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: hsla(0, 100%, 100%, 0.9);
`

export const PopoverContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 144px;
  max-height: 265px;
  background-color: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.21);
  display: flex;
  flex-direction: column;
`
