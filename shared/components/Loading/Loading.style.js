import styled, { css } from 'styled-components'

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props => props.hasText && css`
    > div {
      margin-right: 6px;
    }
  `}
`