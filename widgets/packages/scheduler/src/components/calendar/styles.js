import styled from 'styled-components'
import { styles } from '@canvas/common'

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
  color: ${styles.font.grey50};
  display: flex;
  font-size: 0.875rem;
  justify-content: center;
  position: relative;
`

export const CalendarDateButton = styled.button`
  background-color: ${p =>
    p.selected ? `var(--bg, ${styles.default.primary})` : 'unset'};
  border: none;
  border-radius: 50%;
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
  background-color: unset;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;
`

export const CalendarHeading = styled.h2`
  color: var(--c, ${styles.default.primary});
  font-size: 1.125rem;
  font-weight: 700;
  left: auto;
  position: relative;
  right: auto;
`

export const MonthBox = styled.div`
  display: flex;
  padding: 8px;
`

export const ScreenReaderOnly = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`
