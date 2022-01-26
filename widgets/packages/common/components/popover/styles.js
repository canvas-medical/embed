import styled from 'styled-components'

export const PopoverContainer = styled.div`
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.21);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: absolute;
  width: 100%;
`

export const PopoverIcon = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 0;
`

export const PopoverMessages = styled.ul``

export const PopoverMessage = styled.li`
  margin-top: 1rem;
`

export const PopoverButtons = styled.p`
  display: flex;
  justify-content: center;
  margin: 1rem 0 0;

  * + * {
    margin-left: 1rem;
  }
`
