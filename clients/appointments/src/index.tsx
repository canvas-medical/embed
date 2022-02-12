import { h, render } from 'preact'
import { example } from '@canvas/embed-common'

type InitialProps = {
  rootId: string
}

export const Appointments = () => {
  return <div>{example}</div>
}

export const init = ({ rootId }: InitialProps) => {
  const appRoot = document.querySelector(`#${rootId}`)

  if (!appRoot) {
    console.error('App root could not be found. Check your rootId')
    return null
  }

  appRoot.attachShadow({
    mode: 'open',
  })

  if (!appRoot.shadowRoot) {
    console.error('Shadow root could not be attached')
    return null
  }

  render(<Appointments />, appRoot.shadowRoot)
}
