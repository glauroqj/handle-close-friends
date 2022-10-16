import styled from 'styled-components'

export const NavbarLogo = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`
export const NavbarLinkItem = styled.div`
  
  > a {
    text-decoration: none;
    color: inherit;
  }
`
export const NavbarUserContainer = styled.div`
  min-width: 64px;
  
  // 1100px
  @media ( min-width: ${props => props.theme.breakpoint.md} ) {

  }

  // 830px
  @media ( max-width: ${props => props.theme.breakpoint.sm} ) {

  }

  // 640px
  @media ( max-width: ${props => props.theme.breakpoint.xs} ) {

  }
`
export const NavbarUserDesktop = styled.div`
  display: flex;

  // 640px
  @media ( max-width: ${props => props.theme.breakpoint.xs} ) {
    display: none;
  }
`
export const NavbarUserMobile = styled.div`
  display: none;

  // 1100px
  @media ( min-width: ${props => props.theme.breakpoint.md} ) {

  }

  // 830px
  @media ( max-width: ${props => props.theme.breakpoint.sm} ) {

  }

  // 640px
  @media ( max-width: ${props => props.theme.breakpoint.xs} ) {
    display: flex;
  }
`