import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { Button, ButtonGroup } from '../../src'

describe('Button', () => {
  it('renders with minimal props', () => {
    expect(
      render(
        <Button bc="#232323" hc="#303030">
          I'm some text
        </Button>
      )
    ).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <Button bc="#232323" hc="#303030" fc="#000" m="16px">
          I'm some text
        </Button>
      )
    ).toMatchSnapshot()
  })
})

describe('ButtonGroup', () => {
  it('renders', () => {
    expect(
      render(
        <ButtonGroup>
          <Button bc="#232323" hc="#303030">
            I'm some text
          </Button>
          <Button bc="#232323" hc="#303030">
            I'm othertext
          </Button>
        </ButtonGroup>
      )
    ).toMatchSnapshot()
  })
})
