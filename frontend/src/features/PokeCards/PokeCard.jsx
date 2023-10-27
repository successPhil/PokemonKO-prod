import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardBaloo from '../../styles/CardBaloo';
import TooltipBaloo from '../../styles/TooltipBaloo'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PopoverPopupState from './MovesPop';
import TrainerContext from '../../contexts/TrainerContext';
import { useContext } from 'react';
import { getTrainerPokemon } from '../../api/authApi';
import { capitalizeFirst } from '../Enemy/EnemyData';


export default function PokeCard({pokemon}) {
  const { selectPokemon, setSelectPokemon, typeToClassname, typeToIcon, setEnemyDialogue} = useContext(TrainerContext)
  

  const choosePokemon = (pokemon) => {
    console.log(selectPokemon)
    if (!selectPokemon){
      const selectStr = `You have chosen ${capitalizeFirst(pokemon.name)}! ${capitalizeFirst(pokemon.name)} is ready for battle!`
      setEnemyDialogue(selectStr)
      setSelectPokemon(pokemon)
    } else if (pokemon.id !== selectPokemon.id){
      setSelectPokemon(pokemon)
      const selectStr = `You have chosen ${capitalizeFirst(pokemon.name)}! ${capitalizeFirst(pokemon.name)} is ready for battle!`
      setEnemyDialogue(selectStr)
    }
  }

  const handleTrainerSelect = async () => {
    const battlePoke = await getTrainerPokemon(pokemon.id)
    choosePokemon(battlePoke)
  }
   
    return (   
      <Paper elevation={3} sx={{mt: 10, maxWidth: 420 , height: 555, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius:15, borderTopRightRadius:15}}>
        <CardMedia
          component="img"
          height="275"
          image={pokemon.front_image_url}
          sx={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            objectFit: 'contain', // This ensures the image is contained within the specified height and width
          }}
        />
        <CardContent sx={{maxHeight:185, height:100, ml: 3}}>
          <Grid container>
          <Grid item xs={6}>
          <CardBaloo>Name: {capitalizeFirst(pokemon.name)}</CardBaloo>
          {pokemon.types.split(', ').map(type => (
        <span key={type} className={`pokemon-type-icon ${typeToClassname[type]}`} style={{ marginRight: '8px' }}>
          <span className='icon-background'>Z</span>{typeToIcon[type]}
        </span>
      ))}
          <CardBaloo>Type: {pokemon.types}</CardBaloo>
          <CardBaloo>Level: {pokemon.level}</CardBaloo>
        
          </Grid>
          <Grid item xs={6}>
          <CardBaloo sx={{ml: 2}}>Power: {pokemon.power}</CardBaloo>
          <CardBaloo sx={{ml: 2}}>Defense: {pokemon.defense}</CardBaloo>
          <CardBaloo sx={{ml: 2}}>Health: {pokemon.health}/{pokemon.max_health}</CardBaloo>
          <CardBaloo sx={{ml: 2}}>XP: {pokemon.experience}/{pokemon.totalXP}</CardBaloo>
          </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{mt: 9, mr: 1}}>
        <Grid container justifyContent="space-between" sx={{ p: 3 }}>
  <Grid item xs={3}>
    <PopoverPopupState  moves={pokemon.moves} />
  </Grid>
  <Grid item xs={3}>
  <Tooltip 
  title={<TooltipBaloo style={{ color: '#cacfcd'}}>Select the pokemon you would like to use for battle</TooltipBaloo>} 
  arrow 
  sx={{ color: '#2f1a4a' }}
>
    <Button variant='contained' color='primary' onClick={handleTrainerSelect}><CardBaloo>Select</CardBaloo></Button>
    </Tooltip>
  </Grid>
</Grid>
</CardActions> 
      </Paper>
    );
  }

