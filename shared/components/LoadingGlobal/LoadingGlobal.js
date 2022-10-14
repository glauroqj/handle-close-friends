import { useState } from 'react'
import Router from 'next/router'
/** components */
import Loading from 'shared/components/Loading/Loading'
/** ui */
import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'

const LoadingGlobal = () => {
  const [isLoading, setLoading] = useState(false)

  Router.onRouteChangeStart = () => {
    // console.log('< CHANGE ROUTE START >')
    setLoading(true)
  }

  Router.onRouteChangeComplete = () => {
    // console.log('< CHANGE ROUTE DONE >')
    setLoading(false)
  }

  Router.onRouteChangeError = () => {
    // console.log('< CHANGE ROUTE ERROR >')
    setLoading(false)
  }

  return (
    <Backdrop open={isLoading} className="global-loading">
      <Loading />
      <Typography variant="h4" align="center">Carregando...</Typography>
    </Backdrop>
  )
}

export default LoadingGlobal