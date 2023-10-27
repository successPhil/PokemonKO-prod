import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import CardBaloo from '../../styles/CardBaloo';
import Button from '@mui/material/Button';
import TrainerContext from '../../contexts/TrainerContext';
import { useContext, useState} from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { makeTransaction } from '../../api/authApi';


export default function TrainerShopCard({item} ) {
    const {trainer, trainerShop, setTrainerShop } = useContext(TrainerContext)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [ itemsBought, setItemsBought ] = useState(1)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        if (shouldRedirect){
            navigate("/items")
        }
    }, [shouldRedirect])

   

    const handleChange = (event) => {
    setItemsBought(event.target.value);
    };

    const handleClose = () => {
      setOpen(false);
     };

    const handleOpen = () => {
    setOpen(true);
    };

    const updateShopItems = async () => {
        if (trainer.money >= item.value * itemsBought) {
            const updatedItem = trainerShop.find(item => item.id === item.id);
            if (updatedItem){
                updatedItem.quantity -= itemsBought;
                const updatedShopItems = trainerShop.map(item =>
                    item.id === updatedItem.id ? updatedItem : item);
                makeTransaction(item, itemsBought, 'buy')
                setTrainerShop(updatedShopItems)
                setShouldRedirect(true)
            }
        }
    }

    return(
        <>
        <Paper elevation={3} sx={{mt: 8, pt:2, pl:4, pr: 4, height: 100, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius:15, borderTopRightRadius:15}}>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
                <CardBaloo>{item.name}</CardBaloo>
                <CardBaloo>Quantity: {item.quantity}</CardBaloo>
                <CardBaloo>Value: {item.value}</CardBaloo>
                <FormControl>
                <InputLabel id="shop-controlled-open-filled-select-label"><span className='pokemon-type-input'>Select Amount</span></InputLabel>
                <Select
                labelId="shop-controlled-open-select-label"
                id="shop-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={itemsBought}
                onChange={handleChange}
                variant='standard'
                >
{[...Array(item.quantity).keys()].map(i => (
        <MenuItem value={i + 1} key={`amountItem${i+1}${i + 1}`}><span className='item-button-text'>{i + 1}</span></MenuItem>
    ))}
                </Select>
                </FormControl>
                <Button variant='contained' color='primary' onClick={updateShopItems}><span className='item-button-text'>Buy Item</span></Button>
            </CardContent>
        </Paper>

        </>
    )
}