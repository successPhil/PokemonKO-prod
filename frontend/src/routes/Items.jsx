import { getTrainerItems, updateItems } from "../api/authApi"
import TrainerContext from "../contexts/TrainerContext"
import { useContext, useEffect, useState } from "react"
import TrainerItemsCard from "../features/ItemCards/TrainerItemsCard"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"


export default function Items() {
    const { trainerItems, setTrainerItems } = useContext(TrainerContext)
    const [ filteredList, setFilteredList ] = useState("")

    const refreshItems = async () => {
        const items = await getTrainerItems()
        setTrainerItems(items)
      }

    useEffect(()=>{
        refreshItems()
    }, [])

    return (
        <>
        {trainerItems ? (
        <Container>
        <Grid container spacing={2} sx={{justifyContent:'center'}}>
          {trainerItems.map(item => (
            <Grid item xs={9} key={item.id} sx={{justifyContent:'center'}}>
              <TrainerItemsCard item={item} />
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