import { useEffect, useContext, useState } from 'react';
import TrainerContext from '../contexts/TrainerContext';
import { getTrainerPokemon, getFirstPokemon } from '../api/authApi';
import PokeCard from '../features/PokeCards/PokeCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import { capitalizeFirst } from '../features/Enemy/EnemyData';
export default function TrainerPokes(){

    const token = localStorage.getItem('token')
    const { trainerPokemon, setTrainerPokemon, selectPokemon, setSelectPokemon, setEnemyDialogue } = useContext(TrainerContext);
    const [ filteredList, setFilteredList ] = useState("")
    const [ filteredMap , setFilteredMap ] = useState("")
    
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        console.log(event.target.value, 'WHAT IS THIS')
        if (event.target.value === ""){
            setFilteredList("")
            setFilteredMap("")
        }
        if (event.target.value !== ""){
            setFilteredMap(filteredPokemonTypes(event.target.value))
            console.log(filteredPokemonTypes(event.target.value), 'CHECKING TYPES IN EVENT')
            setFilteredList(event.target.value)
            }
    };

    

    const filteredNameAZ = () => {
        const pokemonToSort = Array.from(trainerPokemon)
        setFilteredMap(pokemonToSort.sort((a, b) => a.name.localeCompare(b.name)))
        setFilteredList("buttonFilter")
    }
    const filteredNameZA = () => {
        const pokemonToSort = Array.from(trainerPokemon)
        setFilteredMap(pokemonToSort.sort((a, b) => b.name.localeCompare(a.name)))
        setFilteredList("buttonFilter")
    }

    const filteredPowerLow = ()=> {
        const pokemonToFilter = Array.from(trainerPokemon)
        setFilteredMap(pokemonToFilter.sort((a, b) => a.power - b.power))
        setFilteredList("buttonFilter")
    }

    const filteredPowerHigh = ()=> {
        const pokemonToFilter = Array.from(trainerPokemon)
        setFilteredMap(pokemonToFilter.sort((a, b) => b.power - a.power ))
        setFilteredList("buttonFilter")
    }

    const filteredPokemonTypes = (typeSelected) => {
        const pokemonToFilter = Array.from(trainerPokemon)
        return pokemonToFilter.filter((pokemon) => {
            const types = pokemon.types.split(", ")
            return types.includes(typeSelected)
        })
    }


    const uniqueTypesList = new Set();
    if (trainerPokemon){
        trainerPokemon.forEach((pokemon) => {
            const types = pokemon.types.split(", ")
            types.forEach((type) => uniqueTypesList.add(type))
        })
    }
    const typeOptions = Array.from(uniqueTypesList)

    
    // const filteredPokemonTypes = trainerPokemon.filter((pokemon) => {
    //     const types = pokemon.types.split(", ")
    //     return types.includes(filteredList)
    // })

    const handleClose = () => {
      setOpen(false);
     };

    const handleOpen = () => {
    setOpen(true);
    };

    
    useEffect(() => {
        const fetchTrainerPokemon = async () => {
        if (token) {
            try {
            const data = await getTrainerPokemon();
            setTrainerPokemon(data);
            } catch (error) {
                console.error('Error fetching trainer Pokemon:', error);
            }
        }
        };
    fetchTrainerPokemon()
}, [selectPokemon]);

const firstPoke = async () => {
      
    console.log(trainerPokemon)
    if (!trainerPokemon || trainerPokemon.length === 0){
        const starterPoke = await getFirstPokemon()
        const firstPokeMsg = `You received a ${capitalizeFirst(starterPoke.name)}!`
        console.log(firstPokeMsg, 'testing message')
        setEnemyDialogue(firstPokeMsg)
        setSelectPokemon(starterPoke)
    }
}


useEffect(() => {
    firstPoke()
}, [])

    return (
        <>
        {trainerPokemon ? (<>
            <Grid container mt={3} sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={filteredNameAZ} ><span className="item-button-text">Name A-Z</span></Button>
            </Grid>
            <Grid item xs={2} >
                <Button variant="contained" color="primary" onClick={filteredNameZA}><span className="item-button-text">Name Z-A</span></Button>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={filteredPowerHigh} ><span className="item-button-text">Highest Power</span></Button>
            </Grid>
            <Grid item xs={2} >
                <Button variant="contained" color="primary" onClick={filteredPowerLow} ><span className="item-button-text">Lowest Power</span></Button>
            </Grid>
            <Grid item xs={2}>
            <FormControl variant='filled'>
            <InputLabel id="demo-controlled-open-filled-select-label"><span className='pokemon-type-input'>Select Type</span></InputLabel>
            <Select
                labelId="demo-controlled-open-filled-select-label"
                id="demo-controlled-open-filled-select"
                open={open}
                label="Select Type"
                onClose={handleClose}
                onOpen={handleOpen}
                value={filteredList}
                onChange={handleChange}
                variant='filled'
                >
                    {typeOptions.map((type, index) => (
                        <MenuItem key={`menuitemtype${index}`}value={type}><span className='item-button-text'>{type}</span></MenuItem>
                    ))}
                    <MenuItem value=""><span className='item-button-text'>All</span></MenuItem>
                    </Select>
                    </FormControl>
            </Grid>
        </Grid>
        <Container id='centered-container'>
        <Grid container spacing={2}>
          {filteredList === "" && filteredMap === "" && trainerPokemon.map(pokemon => (
            <Grid item xs={3} key={pokemon.id}>
              <PokeCard pokemon={pokemon} />
            </Grid> 
          ))}
          {/* {filteredList !== "" && filteredMap === "" && filteredMap.map(pokemon => (
            <Grid item xs={3} key={pokemon.id}>
              <PokeCard pokemon={pokemon} />
            </Grid> 
          ))} */}
          {filteredList !== "" && filteredMap !== "" && filteredMap.map(pokemon => (
            <Grid item xs={3} key={pokemon.id}>
              <PokeCard pokemon={pokemon} />
            </Grid> 
          ))}

        </Grid>
        </Container>
     </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}