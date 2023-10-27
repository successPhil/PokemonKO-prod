import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import CardBaloo from '../../styles/CardBaloo';
import Button from '@mui/material/Button';
import TrainerContext from '../../contexts/TrainerContext';
import { updateItems } from '../../api/authApi';
import { useContext, useState} from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { capitalizeFirst } from '../Enemy/EnemyData';


export default function TrainerItemsCard({ item }) {
    const { endTrainerTurn, selectPokemon, setSelectPokemon, trainerItems, setTrainerItems,  setTrainerDialogue } = useContext(TrainerContext)
    const [ shouldRedirectBattle, setShouldRedirectBattle ] = useState(false)
    const [open, setOpen] = useState(false);
    const [ itemsUsed, setItemsUsed ] = useState(1)
    const navigate = useNavigate()

    useEffect(()=>{
        if (shouldRedirectBattle){
            navigate("/battle")
        }
    }, [shouldRedirectBattle])

    const handleChange = (event) => {
    setItemsUsed(event.target.value);
    };

    const handleClose = () => {
      setOpen(false);
     };

    const handleOpen = () => {
    setOpen(true);
    };


    const updateTrainerItems = async () => {
        // Find the item to update
        const updatedItem = trainerItems.find(item => item.id === item.id);
    
        if (updatedItem && selectPokemon) {
            // Update the quantity
            updatedItem.quantity -= itemsUsed;
            // Create a new array with the updated item
            const updatedTrainerItems = trainerItems.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            );
            // Set the new state
            setTrainerItems(updatedTrainerItems);
            // Send the update to the backend
            updateItems(item.id, itemsUsed);
            console.log(item.item_class)
            if (item.item_class === 'health') {
                const healingAmount = item.stat_boost * itemsUsed
                const missingHealth = selectPokemon.max_health - selectPokemon.health
                const usedHealingAmount = healingAmount > missingHealth ? missingHealth : healingAmount
                const newHealth = selectPokemon.health + healingAmount
                const maxHealth = selectPokemon.max_health
                const updatedHealth = newHealth > maxHealth ? maxHealth : newHealth;
                const itemMsg = `${capitalizeFirst(selectPokemon.name)} has healed ${usedHealingAmount} from using ${itemsUsed} ${item.name}${itemsUsed > 1 ? "s" : ""}! ${capitalizeFirst(selectPokemon.name)} now has ${updatedHealth} health!!!`
                setTrainerDialogue(itemMsg)
                setSelectPokemon((prev) => ({...prev, health: updatedHealth, }))
            }
            if (item.item_class === 'maxhealth'){
                console.log('IN ITEM CLASS CONDITIONAL MAX HEALTH')
                const maxHealthToAdd = item.stat_boost * itemsUsed
                const newMaxHealth = selectPokemon.max_health + maxHealthToAdd
                console.log(newMaxHealth)
                const itemMsg = `${capitalizeFirst(selectPokemon.name)} has gained ${maxHealthToAdd} max health from using ${itemsUsed} ${item.name}${itemsUsed > 1 ? "s" : ""}`
                setTrainerDialogue(itemMsg)
                setSelectPokemon((prev) => ({...prev, max_health: newMaxHealth}))
            }
            if (item.item_class === 'damage'){
                console.log('IN ITEM CLASS CONDITIONAL DAMAGE')
                const powerToAdd = item.stat_boost * itemsUsed
                const newPower = selectPokemon.power + powerToAdd
                const itemMsg = `${capitalizeFirst(selectPokemon.name)} has gained ${powerToAdd} power! from using ${itemsUsed} ${item.name}${itemsUsed > 1 ? "s" : ""}`
                setTrainerDialogue(itemMsg)
                setSelectPokemon((prev) => ({...prev, power: newPower}))
            }
            if (item.item_class === 'defense'){
                console.log('IN ITEM CLASS CONDITIONAL Defense')
                const defenseToAdd = item.stat_boost * itemsUsed
                const newDefense = selectPokemon.defense + defenseToAdd
                const itemMsg = `${capitalizeFirst(selectPokemon.name)} has gained ${defenseToAdd} defense! from using ${itemsUsed} ${item.name}${itemsUsed > 1 ? "s" : ""}`
                setTrainerDialogue(itemMsg)
                setSelectPokemon((prev) => ({...prev, defense: newDefense}))
            }
            endTrainerTurn()
            setShouldRedirectBattle(true)
        }
    };


    return(
        <>
        <Paper elevation={3} sx={{mt: 8, pt:2, pl:4, pr: 4, height: 100, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius:15, borderTopRightRadius:15}}>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
                <CardBaloo>{item.name}</CardBaloo>
                <CardBaloo>Quantity: {item.quantity}</CardBaloo>
                <CardBaloo>Value: {item.value}</CardBaloo>
                <FormControl>
                <InputLabel id="items-controlled-open-filled-select-label"><span className='pokemon-type-input'>Select Amount</span></InputLabel>
                <Select
                labelId="items-controlled-open-select-label"
                id="items-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={itemsUsed}
                onChange={handleChange}
                variant='standard'
                >
{[...Array(item.quantity).keys()].map(i => (
        <MenuItem value={i + 1} key={`amountItem${item.id}${i + 1}`}><span className='item-button-text'>{i + 1}</span></MenuItem>
    ))}
                </Select>
                </FormControl>
                {selectPokemon && <Button variant='contained' color='primary' onClick={updateTrainerItems}><span className='item-button-text'>Use Item</span></Button>}
            </CardContent>
        </Paper>

        </>
    )
}