import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from '../../images/PokemonKoNew.png'
import Baloo from '../../styles/CustomTypography';


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
    }
  ];

export default function ResponsiveAppBar({handleLogout}) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo}  style={{ width: '450px', height: 'auto' }}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'}, justifyContent: 'space-between'}}>
            {menuItems.map((buttonInfo) => (
                <Link to={buttonInfo.path} key={`link${buttonInfo.label}`} style={{ textDecoration: 'none' }}>
                    <Button
                        key={`button${buttonInfo.label}`}
                        sx={{
                            mx:3,
                            my: 2,
                            display: 'block',
                            fontFamily: 'Baloo 2, sans-serif',
                            fontSize: '2.0rem',
                            color: '#cacfcd', 
                          }}
                    >
                    <Baloo variant="button">{buttonInfo.label}</Baloo>
                    </Button>
              </Link>
             
           
            ))}
             <Link to="/" id="logout" style={{ textDecoration: 'none' }} >
              <Button onClick={handleLogout}
              variant="outlined"
              color='primary'
              sx={{
                mx:3,
                my: 2,
                display: 'block',
              }}>
                    <Baloo variant="button" >Logout</Baloo>
                    </Button>
          </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
