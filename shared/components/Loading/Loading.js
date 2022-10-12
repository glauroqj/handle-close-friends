import React from 'react'
import PropTypes from 'prop-types'
/** style */
import * as El from './Loading.style'
/** components */
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

const Loading = ({ text, color }) => (
  <El.LoadingContainer hasText={text ? true : false}>
    <HourglassEmptyIcon color={color} size={30} />
    {text}
  </El.LoadingContainer>
)

Loading.defaultProps = {
  text: '',
  color: 'primary'
}

Loading.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
}

export default Loading