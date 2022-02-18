import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { ArrowBack } from '../../src'

describe('Arrow Back', () => {
  it('renders without props', () => {
    expect(render(<ArrowBack />)).toMatchSnapshot()
  })
})
