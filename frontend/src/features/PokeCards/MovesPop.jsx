import * as React from 'react';
import Grid from '@mui/material/Grid'
import CardBaloo from '../../styles/CardBaloo';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MovesCard from './MovesCard';
import Container from '@mui/material/Container'

export default function PopoverPopupState({moves}) {
  return (
    <PopupState 
    variant="popover"
    popupId="demo-popup-popover"
    id="custom-popover"      
    >
      {(popupState) => (
        <div>
        <Button variant='contained' color='primary' {...bindTrigger(popupState)}>
            <CardBaloo>Moves</CardBaloo>
            </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Container sx={{backgroundColor: '#707078'}}>
            <Grid container spacing={2}>
  {moves.map((move) => (
    <Grid item xs={3} key={move.id}>
      <MovesCard move={move}/>
    </Grid>
    
  ))}
</Grid>
</Container>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}