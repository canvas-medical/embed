import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { App } from '../src/App'

describe('App', () => {
  it('renders', () => {
    expect(render(<App />)).toMatchSnapshot()
  })
})
