import TrainerContext from "../contexts/TrainerContext"
import { useContext, useEffect } from "react"

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { getTrainer, getTrainerShop } from "../api/authApi"
import GameText from "../styles/PokemonGB"
import { useState } from "react"
import Button from "@mui/material/Button"
import TrainerShopCard from "../features/ItemCards/TrainerShopCard"



export default function Shop(){
    const {trainerShop, setTrainerShop , trainer, setTrainer } = useContext(TrainerContext)

    const [ filteredList, setFilteredList ] = useState("")


    const getUserTrainer = async () => {
        const userTrainer = await getTrainer()
        setTrainer(userTrainer)
      }

    const filteredValueLow = ()=> {
        const itemsToFilter = Array.from(trainerShop)
        setFilteredList(itemsToFilter.sort((a, b) => a.value - b.value))
    }

    const filteredValueHigh = ()=> {
        const itemsToFilter = Array.from(trainerShop)
        setFilteredList(itemsToFilter.sort((a, b) => b.value - a.value ))
    }
    
    const getUserShop = async () => {
        const shop = await getTrainerShop()
        setTrainerShop(shop)
      }
   
    useEffect(()=>{
        getUserTrainer()
        getUserShop()
    }, [])

    console.log(trainerShop, 'TRAINER SHOP')
    console.log(filteredList, 'FILTERED LIST, TRAINER SHOP')

    return (
        <>
        {trainer && trainerShop ? (
        <Container>
            <Grid container sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Grid item xs={6}>
            <Paper sx={{height: 63, mt:2, pt:2, pl:3, pr:2}}>
            <GameText>KO coins: {trainer.money}</GameText>
            </Paper>
            </Grid>
            </Grid>
            <Grid container mt={3}>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={filteredValueLow}><span className="item-button-text">Lowest Value</span></Button>
                </Grid>
                <Grid item xs={3} >
                    <Button variant="contained" color="primary" onClick={filteredValueHigh}><span className="item-button-text">Highest Value</span></Button>
                </Grid>
            </Grid>
            
        <Grid container spacing={2} sx={{justifyContent:'center'}}>
            
          {filteredList === "" && trainerShop.map(item => (
            <Grid item xs={12} key={item.id}>
              <TrainerShopCard item={item} />
            </Grid>   
          ))}
          {filteredList !== "" && filteredList.map(item => (
            <Grid item xs={12} key={item.id}>
              <TrainerShopCard item={item} />
            </Grid>   
          ))}
        </Grid>
        </Container>
     
      ) : (
        <p>Loading...</p>
      )}
    </>
    )
}