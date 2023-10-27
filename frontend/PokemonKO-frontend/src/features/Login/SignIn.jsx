import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginSnack from './LoginSnack';


export default function SignIn({checked, handleInputChange, handleOnClick, handleSubmit, signUp, handleSignUp, formData }) {
  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" color="#cacfcd;">
            <span id="sign-in">Sign in</span>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleInputChange}
              color="secondary"
              InputLabelProps={{
                style: { color: '#cacfcd', fontFamily:'Baloo 2'},
                shrink: true, 
              }}
              InputProps={{
                style: { color: '#cacfcd', backgroundColor: '#8d86c9', fontFamily:'Baloo 2', fontSize:'1.4rem', paddingTop:'0px', paddingLeft:'0px' }}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              color="secondary"
              InputLabelProps={{
                style: { color: '#cacfcd', fontFamily:'Baloo 2'},
                shrink: true, 
              }}
              InputProps={{
                style: { color: '#cacfcd', backgroundColor: '#8d86c9' }}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" checked={checked} onClick={() => handleOnClick(checked)} />}
              label={<span className='sign-in-log-in' style={{ color: '#cacfcd'}}>Sign up</span>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,fontSize:'1.2rem' }}
              onClick={()=>handleSignUp()}
              color="primary"
            >
              {checked ? (<div className='sign-in-log-in'>Submit</div>):(<div className='sign-in-log-in'>Sign In</div>)}
            </Button>
              <LoginSnack signUp={signUp} formData={formData}/>
          </Box>
        </Box>
      </Container>
  );
}