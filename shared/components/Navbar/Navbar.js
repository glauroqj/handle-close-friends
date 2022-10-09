/** next */
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
/** components */
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
/** icons */
import MenuIcon from '@mui/icons-material/Menu'
/** style */
import * as El from './Navbar.style'

const Navbar = ({ user }) => {
  const [stateNavbar, setStateNavbar] = useState({
    isDropdownOpen: false,
    anchorEl: null,
    showAlert: true
  })

  let account = user?.uid ? true : false

  console.log('< NAVBAR > ', user)

  const chooseTemplate = () => {

    // if (loading) return <Loading color='secondary' />

    if (!account) {
      return (
        <>
          {/** DESKTOP - TABLET */}
          <El.NavbarUserDesktop>
            <Link href='/auth' passHref>
              <Button
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </Link>
          </El.NavbarUserDesktop>

          {/** MOBILE */}
          <El.NavbarUserMobile>
            <Button
              aria-controls="logged-menu"
              aria-haspopup="true"
              variant="text"
              color="secondary"
              onClick={e => setStateNavbar({ ...stateNavbar, isDropdownOpen: true, anchorEl: e.currentTarget })}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="logged-menu"
              anchorEl={stateNavbar.anchorEl}
              keepMounted
              open={stateNavbar.isDropdownOpen}
              onClose={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}
            >
              <Link href='/auth' passHref>
                <MenuItem>
                  <a>Login</a>
                </MenuItem>
              </Link>
            </Menu>
          </El.NavbarUserMobile>
        </>
      )
    }

    if (account) {
      return (
        <El.NavbarUserContainer className="animated fadeIn">
          <Button
            aria-controls="logged-menu"
            aria-haspopup="true"
            variant="text"
            color="secondary"
            onClick={e => setStateNavbar({ ...stateNavbar, isDropdownOpen: true, anchorEl: e.currentTarget })}
          >
            <Avatar src={user?.photoURL} />
          </Button>
          <Menu
            id="logged-menu"
            anchorEl={stateNavbar.anchorEl}
            keepMounted
            open={stateNavbar.isDropdownOpen}
            onClose={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}
          >
            <Link href='/dashboard'>
              <MenuItem onClick={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}>
                <El.NavbarLinkItem>
                  Dashboard
                </El.NavbarLinkItem>
              </MenuItem>
            </Link>
            {/* <Link to='/myaccount'>
              <MenuItem onClick={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}>
                <El.NavbarLinkItem>
                  Minha Conta
                </El.NavbarLinkItem>
              </MenuItem>
            </Link>
            <Link to='/'>
              <MenuItem onClick={async () => await dispatch( logoutService(), setStateNavbar({isDropdownOpen: false, anchorEl: null}) )}>
                <El.NavbarLinkItem>
                  Sair
                </El.NavbarLinkItem>
              </MenuItem>
            </Link> */}
          </Menu>
        </El.NavbarUserContainer>
      )
    }

  }

  return (
    <AppBar position="static">
      <Toolbar>

        <Grid container direction="row" justifyContent="flex-start">
          <El.NavbarLogo>
            <Link href='/' passHref replace>
              <a>
                <Typography variant="h6">
                  Handle App
                </Typography>
              </a>
            </Link>
          </El.NavbarLogo>
        </Grid>

        <Grid container direction="row" justifyContent="flex-end">

          <El.NavbarUserContainer>

            {chooseTemplate()}

          </El.NavbarUserContainer>

        </Grid>

      </Toolbar>
    </AppBar>
  )
}

// Navbar.defaultProps = {
//   active: ''
// }

// Navbar.propTypes = {
//   state: PropTypes.object.isRequired
// }

export default Navbar