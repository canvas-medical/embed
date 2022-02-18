import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Close } from '../../src'

describe('Close', () => {
  it('renders without props', () => {
    expect(render(<Close />)).toMatchSnapshot()
  })
})
