import styled from 'styled-components'
import { styles } from '@canvas/common'

export const CalendarContainer = styled.div`
  width: 343px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
  margin-top: 16px;
  padding-bottom: 16px;
  height: fit-content;
`

export const CalendarHeaderBox = styled.div`
  width: inherit;
  margin-left: 40px;
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
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  color: ${styles.font.grey50};
`

export const CalendarDateButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: ${p =>
    p.selected ? `var(--bg, ${styles.default.primary})` : 'unset'};
  color: ${p =>
    p.disabled
      ? styles.font.grey25
      : p.selected
      ? styles.font.white
      : styles.font.grey75};
  height: 41px;
  width: 41px;
`

export const MonthSelect = styled.select`
  border: none;
  background-color: unset;
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 700;
`

export const CalendarHeading = styled.h2`
  color: var(--c, ${styles.default.primary});
  font-size: 1.125rem;
  font-weight: 700;
  position: relative;
  left: auto;
  right: auto;
`

export const MonthBox = styled.div`
  padding: 8px;
  display: flex;
`
