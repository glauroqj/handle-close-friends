/** next */
import Link from 'next/link'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
/** components */
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/** shared components */
import Loading from 'shared/components/Loading/Loading'
/** icons */
import MenuIcon from '@mui/icons-material/Menu'
/** style */
import * as El from './Navbar.style'

const Navbar = ({ session, handlLogout, locale, handleChangeLang }) => {
  const [stateNavbar, setStateNavbar] = useState({
    isDropdownOpen: false,
    anchorEl: null,
    showAlert: true
  })

  // console.log('< NAVBAR > ', session)

  const chooseTemplate = () => {

    // if (loading) return <Loading color='secondary' />

    if (!session?.uid) {
      return (
        <>
          {/** DESKTOP - TABLET */}
          <El.NavbarUserDesktop>
            <Link href='/login' passHref>
              <Button
                color="secondary"
                variant="contained"
                size='small'
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
              size='small'
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
              <Link href='/login' passHref>
                <MenuItem>
                  Login
                </MenuItem>
              </Link>
            </Menu>
          </El.NavbarUserMobile>
        </>
      )
    }

    if (session?.uid) {
      return (
        <El.NavbarUserContainer className="animated fadeIn">
          <Button
            aria-controls="logged-menu"
            aria-haspopup="true"
            variant="text"
            color="secondary"
            onClick={e => setStateNavbar({ ...stateNavbar, isDropdownOpen: true, anchorEl: e.currentTarget })}
          >
            <Avatar src={session?.photoURL} />
          </Button>
          <Menu
            id="logged-menu"
            anchorEl={stateNavbar.anchorEl}
            keepMounted
            open={stateNavbar.isDropdownOpen}
            onClose={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}
          >
            <El.NavbarLinkItem>
              <Link href='/dashboard'>
                <MenuItem onClick={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}>
                  Dashboard
                </MenuItem>
              </Link>
            </El.NavbarLinkItem>
            {/* <Link to='/myaccount'>
              <MenuItem onClick={() => setStateNavbar({ ...stateNavbar, isDropdownOpen: false })}>
                <El.NavbarLinkItem>
                  Minha Conta
                </El.NavbarLinkItem>
              </MenuItem>
            </Link> */}
            <El.NavbarLinkItem>
              <Link href='/'>
                <MenuItem onClick={() => {
                  handlLogout()
                  setStateNavbar({ isDropdownOpen: false, anchorEl: null })
                }}
                >
                  Sair
                </MenuItem>
              </Link>
            </El.NavbarLinkItem>
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
              <Typography variant="h6">
                Handle App
              </Typography>
            </Link>
          </El.NavbarLogo>
        </Grid>

        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
        >

          <Box sx={{ m: 1, minWidth: 80 }}>
            <FormControl size="small">
              <InputLabel id="lang-simple-select-label">Lang</InputLabel>
              <Select
                autoWidth
                labelId="lang-simple-select-label"
                id="lang-simple-select"
                value={locale}
                label="Lang"
                onChange={(e) => handleChangeLang(e.target.value)}
              >
                <MenuItem value={'en-US'}>EN</MenuItem>
                <MenuItem value={'es-ES'}>ES</MenuItem>
                <MenuItem value={'pt-BR'}>PT</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <El.NavbarUserContainer>

            {session?.loading
              ? <Loading color="secondary" />
              : chooseTemplate()
            }

          </El.NavbarUserContainer>

        </Grid>

      </Toolbar>
    </AppBar>
  )
}

// Navbar.defaultProps = {
//   uid: ''
// }

Navbar.propTypes = {
  session: PropTypes.object.isRequired,
  handlLogout: PropTypes.func.isRequired,
  locale: PropTypes.oneOf(["en-US", "es-ES", "pt-BR"]).isRequired,
  handleChangeLang: PropTypes.func.isRequired
}

export default Navbar