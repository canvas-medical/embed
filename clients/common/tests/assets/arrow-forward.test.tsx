import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { ArrowForward } from '../../src'

describe('Arrow Forward', () => {
  it('renders without props', () => {
    expect(render(<ArrowForward />)).toMatchSnapshot()
  })
})
