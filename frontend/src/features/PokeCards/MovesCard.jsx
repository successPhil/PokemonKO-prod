import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardBaloo from '../../styles/CardBaloo';
import React from 'react';
import { useContext } from 'react';
import TrainerContext from '../../contexts/TrainerContext';


export default function MovesCard({move}) {

    const { typeToClassname, typeToIcon } = useContext(TrainerContext);
    const typeClassName = typeToClassname[move.type];
    const icon = typeToIcon[move.type];
    const iconClassName = 'pokemon-type-icon'

    return (
      
      <Paper elevation={3} sx={{mt: 2, maxWidth: 500 ,width: 275,  height: 145, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius:15, borderTopRightRadius:15, backgroundColor:'#2f1a4a'}}>
        <CardContent sx={{maxHeight:185, height:85, ml: 0}}>
          <Grid container direction="column" alignItems="center">
          <Grid item>
          <CardBaloo>name: {move.name}</CardBaloo>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <span className={`${iconClassName} ${typeClassName}`} style={{ marginRight: '25px' }}>{icon}</span>
          <CardBaloo> type: {move.type}</CardBaloo>
          </Grid>
          <CardBaloo>damage: {move.damage}</CardBaloo>
          </Grid>
        </CardContent>
      </Paper>
    );
  }