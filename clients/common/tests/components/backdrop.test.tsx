import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Backdrop, FocusTrapBackdrop } from '../../src'

describe('Backdrop', () => {
  it('renders without props', () => {
    expect(render(<Backdrop />)).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <Backdrop invisible zIndex={2000}>
          <div>I'm a child</div>
        </Backdrop>
      )
    ).toMatchSnapshot()
  })
})

describe('FocusTrapBackdrop', () => {
  it('renders with props', () => {
    expect(
      render(
        <FocusTrapBackdrop open zIndex={2000} shadowRoot="arbitrary">
          <div>I'm a child</div>
        </FocusTrapBackdrop>
      )
    ).toMatchSnapshot()
  })

  it('returns null', () => {
    expect(
      render(
        <FocusTrapBackdrop open={false} zIndex={2000} shadowRoot="arbitrary">
          <div>I'm a child</div>
        </FocusTrapBackdrop>
      )
    ).toMatchSnapshot()
  })
})
