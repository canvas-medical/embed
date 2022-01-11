import { h } from 'preact'

export const ArrowForward = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill={fill || '#fff'}
  >
    <g>
      <path d="M0 0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
    </g>
  </svg>
)