import styled from 'styled-components'
import { styles } from '../utils/styles'

export const Box = styled.div`
  width: ${p => p.width || '100%'};
  display: flex;
  flex-direction: ${p => p.flexDirection || 'column'};
  margin-top: ${p => p.mt || null};
  margin-bottom: ${p => p.mb || null};
  margin-left: ${p => p.ml || null};
  margin-right: ${p => p.mr || null};
  text-align: center;
  align-content: center;
`

export const Section = styled.section`
  width: 100%;
  background-color: ${p => p.backgroundColor || styles.default.accent};
  border-radius: 5px;
  margin-top: ${p => p.mt || null};
  margin-bottom: ${p => p.mb || null};
`

export const IconBox = styled.div`
  height: 36px;
  width: 36px;
  margin: 0 auto;
`
