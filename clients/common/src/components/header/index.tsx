import { h } from 'preact'
import { ArrowBack } from '../../assets'
import { GeneratedColorsType } from '../../utils'
import { IconButtonLink } from '../iconography'
import { H1 } from '../typograhpy'
import { ContainedHeader, HeadingWrapper, StyledHeader } from './styles'

type HeaderPropsType = {
  bailoutURL: string
  colors: GeneratedColorsType
  title: string
}

export const Header = ({ bailoutURL, colors, title }: HeaderPropsType) => (
  <StyledHeader bc={colors.brand.main}>
    <ContainedHeader>
      <IconButtonLink
        href={bailoutURL}
        fc={colors.brand.font}
        hc={colors.accent.hover}
      >
        <ArrowBack />
      </IconButtonLink>
      <HeadingWrapper>
        <H1 fc={colors.brand.font}>{title}</H1>
      </HeadingWrapper>
    </ContainedHeader>
  </StyledHeader>
)
