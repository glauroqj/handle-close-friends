/* eslint-disable react/display-name */
export default ({
  title,
  description
}) => (
  <>
    {title && (
      <title>{title}</title>

    )}
    {description && (
      <meta name="description" content={description} />
    )}
    <meta name="keywords" content="" />

    <meta property="og:url" content={`https://www.handle.com.br/login`} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="handle" />
    <meta property="og:description" content="" />
    <meta property="og:image" content={`https://www.handle.com.br/images/handle_logo_principal.png`} />
    <meta property="og:image:width" content="50" />
    <meta property="og:image:height" content="50" />
  </>
)