import { h } from 'preact'
import { ArrowBack } from '../../assets/arrow-back'
import { IconButtonLink } from '../icon-buttons'
import {
  ContainedHeader,
  Heading,
  HeadingWrapper,
  StyledHeader,
} from './styles'

export const Header = ({ colors, bailoutURL, title }) => (
  <StyledHeader style={{ '--bg': colors.primary }}>
    <ContainedHeader>
      <IconButtonLink
        style={{ '--fc': colors.focus, '--hc': colors.hover }}
        href={bailoutURL}
      >
        <ArrowBack />
      </IconButtonLink>
      <HeadingWrapper>
        <Heading>{title}</Heading>
      </HeadingWrapper>
    </ContainedHeader>
  </StyledHeader>
)
