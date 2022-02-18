import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { AppContainer, Body, Box, Fieldset, AccentBox } from '../../src'

describe('AppContainer', () => {
  it('renders', () => {
    expect(
      render(
        <AppContainer>
          <div>I'm a child</div>
        </AppContainer>
      )
    ).toMatchSnapshot()
  })
})

describe('Body', () => {
  it('renders', () => {
    expect(
      render(
        <Body>
          <div>I'm a child</div>
        </Body>
      )
    ).toMatchSnapshot()
  })
})

describe('Box', () => {
  it('renders without props', () => {
    expect(
      render(
        <Box>
          <div>I'm a child</div>
        </Box>
      )
    ).toMatchSnapshot()
  })

  it('renders with props', () => {
    expect(
      render(
        <Box
          alignItems="unset"
          flexDirection="row"
          m="16px"
          maxWidth="200px"
          width="50%"
        >
          <div>I'm a child</div>
        </Box>
      )
    ).toMatchSnapshot()
  })
})

describe('Fieldset', () => {
  it('renders', () => {
    expect(
      render(
        <Fieldset bc="#232323">
          <div>I'm a child</div>
        </Fieldset>
      )
    ).toMatchSnapshot()
  })
})

describe('AccentBox', () => {
  it('renders', () => {
    expect(
      render(
        <AccentBox bc="#232323">
          <div>I'm a child</div>
        </AccentBox>
      )
    ).toMatchSnapshot()
  })
})
