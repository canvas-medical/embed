import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Warning } from '../../src'

describe('Warning', () => {
  it('renders without props', () => {
    expect(render(<Warning />)).toMatchSnapshot()
  })
})
