import {
  BackgroundColorPropType,
  colors,
  FontColorPropType,
} from '@canvas/embed-common'
import styled from 'styled-components'

export const CalendarContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
  height: fit-content;
  margin-top: 16px;
  padding-bottom: 16px;
  width: 343px;
`

export const CalendarHeaderBox = styled.div`
  margin-left: 40px;
  width: inherit;
`

export const MonthBox = styled.div`
  display: flex;
  padding: 8px;
`

export const MonthSelect = styled.select`
  background-color: unset;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;
`

export const CalendarDateContainer = styled.div`
  margin: 1rem 0;
  padding: 8px;
`

export const CalendarList = styled.ul`
  clear: both;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  margin: 0 1rem;
  padding: 0;
`

export const CalendarListItem = styled.li`
  color: ${colors.font.grey50};
  display: flex;
  font-size: 0.875rem;
  justify-content: center;
  position: relative;
`

type CalendarDateButtonPropsType = {
  selected: boolean
}

export const CalendarDateButton = styled.button<
  CalendarDateButtonPropsType & FontColorPropType & BackgroundColorPropType
>`
  background-color: ${p => (p.selected ? p.bc : 'unset')};
  border: none;
  border-radius: 50%;
  color: ${p =>
    p.disabled ? colors.font.grey25 : p.selected ? p.fc : colors.font.grey75};
  height: 41px;
  width: 41px;
`
