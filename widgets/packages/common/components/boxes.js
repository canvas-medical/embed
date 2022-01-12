import styled from 'styled-components'
import { styles } from '../utils/styles'

export const Box = styled.div`
  align-content: center;
  display: flex;
  flex-direction: ${p => p.flexDirection || 'column'};
  margin-top: ${p => p.mt || null};
  margin-right: ${p => p.mr || null};
  margin-bottom: ${p => p.mb || null};
  margin-left: ${p => p.ml || null};
  text-align: center;
  width: ${p => p.width || '100%'};
`

export const Fieldset = styled.fieldset`
  background-color: ${p => p.backgroundColor || styles.default.accent};
  border: none;
  border-radius: 5px;
  margin: 0 0 1rem;
  padding: 1rem;
`

export const Legend = styled.legend`
  float: left;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding: 0;
`

export const TzMessage = styled.p`
  font-size: 0.875rem;
  margin: 0.875rem 0;
  text-align: center;
`

export const IconBox = styled.div`
  height: 2.25rem;
  width: 2.25rem;
`
