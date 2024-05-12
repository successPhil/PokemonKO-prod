import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from '../../images/PokemonKoNew.png';
import Baloo from '../../styles/CustomTypography';
import { Grid, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const menuItems = [
  {
    label: 'Pokemon',
    path: "pokemon"
  },
  {
    label: 'Battle',
    path: 'battle',
  },
  {
    label: 'Shop',
    path: 'shop',
  },
  {
    label: 'Items',
    path: 'items'
  },
  {
    label: 'Pokedex',
    path: 'pokedex'
  }
];

export default function ResponsiveAppBar({handleLogout}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container alignItems="center">
            {isMobile && (
              <Grid item xs={2}>
                <IconButton
                  color="inherit"
                  aria-label="open menu"
                  onClick={handleMenuOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={isMobile ? 10 : 2}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
              </Typography>
            </Grid>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((buttonInfo) => (
                <MenuItem key={`menu${buttonInfo.label}`} onClick={handleMenuClose}>
                  <Link to={buttonInfo.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Baloo variant="button">{buttonInfo.label}</Baloo>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Baloo variant="button">Logout</Baloo>
              </MenuItem>
            </Menu>
            {!isMobile && (
              <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                {menuItems.map((buttonInfo) => (
                  <Link to={buttonInfo.path} key={`link${buttonInfo.label}`} style={{ textDecoration: 'none' }}>
                    <Button
                      key={`button${buttonInfo.label}`}
                      sx={{
                        mx: 1,
                        fontFamily: 'Baloo 2, sans-serif',
                        fontSize: '2.0rem',
                        color: '#cacfcd',
                      }}
                    >
                      <Baloo variant="button">{buttonInfo.label}</Baloo>
                    </Button>
                  </Link>
                ))}
                <Button onClick={handleLogout} variant="outlined" color="primary">
                  <Baloo variant="button">Logout</Baloo>
                </Button>
              </Box>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
