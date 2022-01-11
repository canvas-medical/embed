import { h } from 'preact'
import { ArrowBack } from '../../assets/arrow-back'
import { IconButtonLink } from '../icon-buttons'
import {
  ContainedHeader,
  Heading,
  HeadingWrapper,
  StyledHeader,
} from './styles'

export const Header = ({ colors, bailoutURL }) => (
  <StyledHeader backgroundColor={colors.primary}>
    <ContainedHeader>
      <IconButtonLink focusColor={colors.focus} href={bailoutURL}>
        <ArrowBack />
      </IconButtonLink>
      <HeadingWrapper>
        <Heading>Schedule an Appointment</Heading>
      </HeadingWrapper>
    </ContainedHeader>
  </StyledHeader>
)
