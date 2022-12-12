import { css } from 'styled-components'

const customNotification = color => css`
  .ct-toast {
    color: #FFFFFF;
    background: ${color.dark};
  };
  .ct-toast-success {
    border-color: ${color.success} !important;
    > svg path {
      fill: ${color.success} !important;
  }
  };
  .ct-toast-error {
    border-color: ${color.error} !important;
    > svg path {
      fill: ${color.error} !important;
  }
  };
  .ct-toast-warning {
    border-color: ${color.warning} !important;
    > svg path {
      fill: ${color.warning} !important;
    }
  };
  .ct-toast-info {
    border-color: ${color.info} !important;
     > svg path {
         fill: ${color.info} !important;
     }
  };
  .ct-toast-loading {
    border-color: ${color.loading} !important;
    > .ct-icon-loading {
      &::after {
        border-color: ${color.loading} transparent ${color.loading} transparent;
      }
    }
  };
`

const globalLoading = () => css`
  .global-loading {
    color: #fff;
    z-index: 9 !important;
    > h4 {
      padding-left: 15px;
    }
  }
`

const commonGlobalStyle = (breakpoint, color, space, font) => {
  return css`
    html, body {
      font-family: ${font.default} !important;
      scroll-behavior: smooth;
      webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      // overflow-y: overlay;
      padding-bottom: 70px;
      
      a {
        text-decoration: none;
        color: inherit;
        width: 100%;
      }

      // 640px
      @media ( max-width: ${breakpoint.xs} ) {
        padding-bottom: 70px;
      }
    }
    ${globalLoading()}
    ${customNotification(color)};
  `
}

export default commonGlobalStyle