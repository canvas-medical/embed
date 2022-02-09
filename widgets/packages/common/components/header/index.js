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
  <StyledHeader style={{ '--bg': colors.brand.main }}>
    <ContainedHeader>
      <IconButtonLink href={bailoutURL}>
        <ArrowBack
          hoverOn
          hoverFill={colors.accent.main}
          fill={colors.brand.font}
        />
      </IconButtonLink>
      <HeadingWrapper>
        <Heading style={{ '--c': colors.brand.font }}>{title}</Heading>
      </HeadingWrapper>
    </ContainedHeader>
  </StyledHeader>
)
