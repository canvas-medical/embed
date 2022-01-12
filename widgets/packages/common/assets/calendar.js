import { h } from 'preact'

export const Calendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="20px"
    viewBox="0 0 24 24"
    width="20px"
    fill="#000000"
  >
    <path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z" />
  </svg>
)

export const BigCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 20 20"
    height="36px"
    viewBox="0 0 20 20"
    width="36px"
    fill="#000000"
  >
    <g>
      <rect fill="none" height="20" width="20" />
    </g>
    <g>
      <path d="M15.5,4H14V2h-1.5v2h-5V2H6v2H4.5C3.67,4,3,4.68,3,5.5v11C3,17.32,3.67,18,4.5,18h11c0.83,0,1.5-0.68,1.5-1.5v-11 C17,4.68,16.33,4,15.5,4z M15.5,16.5h-11V9h11V16.5z M7.5,12H6v-1.5h1.5V12z M10.75,12h-1.5v-1.5h1.5V12z M14,12h-1.5v-1.5H14V12z M7.5,15H6v-1.5h1.5V15z M10.75,15h-1.5v-1.5h1.5V15z M14,15h-1.5v-1.5H14V15z" />
    </g>
  </svg>
)
