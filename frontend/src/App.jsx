import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Trainer from './routes/Trainer'
import ResponsiveAppBar from "./features/AppBar/AppBar"
import TrainerPokes from "./routes/TrainerPokes"
import Shop from "./routes/Shop"
import Items from "./routes/Items"
import TrainerContext from "./contexts/TrainerContext"
import { useState, useEffect } from "react"
import AppTheme from "./features/AppBar/AppTheme"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { getTrainerItems, getTrainerPokemon, getTrainer, getTrainerShop, getGamePokemon } from "./api/authApi"


function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(null)
  const [checked, setChecked] = useState(false)
  const [signUp, setSignUp ] = useState(false)
  const [ trainer, setTrainer ] = useState(null)
  const [ animateSelect, setAnimateSelect ] = useState(false)
  const [ animateSelectAttack, setAnimateSelectAttack ] = useState(false)
  const [ animateEnemyAttack, setAnimateEnemyAttack ] = useState(false)
  const [ animateEnemy, setAnimateEnemy ] = useState(false)
  const [ animateColor, setAnimateColor ] = useState("")
  const [ trainerTurn , setTrainerTurn ] = useState(true)
  const [trainerPokemon, setTrainerPokemon] = useState([]);
  const [selectPokemon, setSelectPokemon ] = useState(null)
  const [ enemyPokemon, setEnemyPokemon ] = useState(null)
  const [ enemyDialogue, setEnemyDialogue ] = useState("")
  const [ trainerDialogue, setTrainerDialogue] = useState("")
  const [ rewardDialogue, setRewardDialogue ] = useState("")
  const [ victoryMsg, setVictoryMsg ] = useState("")

  const [trainerItems, setTrainerItems] = useState([]);
  const [itemsUsed, setItemsUsed ] = useState(1)
  const [trainerShop, setTrainerShop] = useState([]);

  const getItems = async () => {
  const items = await getTrainerItems()
  setTrainerItems(items)
}

  const getTrainerPokes = async () => {
    const trainerPokes = await getTrainerPokemon()
    setTrainerPokemon(trainerPokes)
  }

  const getUserTrainer = async () => {
    const userTrainer = await getTrainer()
    setTrainer(userTrainer)
  }

  const getUserShop = async () => {
    const shop = await getTrainerShop()
    setTrainerShop(shop)
  }
  

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken(token);
      fetchData();
      getItems()
      getTrainerPokes()
      getUserTrainer()
      getUserShop()
      getGamePokemon()
    }
  }, []);

  
  const typeToClassname = {
    grass: 'grass',
    fire: 'fire',
    water: 'water',
    electric: 'electric',
    psychic: 'psychic',
    dark: 'dark',
    steel: 'steel',
    dragon: 'dragon',
    fairy: 'fairy',
    normal: 'normal',
    flying: 'flying',
    poison: 'poison',
    ground: 'ground',
    rock: 'rock',
    bug: 'bug',
    ghost: 'ghost',
    ice: 'ice',
    fighting: 'fighting'
  };

  // Type to icon map
  const typeToIcon = {
    grass: 'g',
    fire: 'r',
    water: 'w',
    electric: 'l',
    psychic: 'p',
    dark: 'd',
    steel: 'm',
    dragon: 'n',
    fairy: 'y',
    normal: 'c',
    flying: 'v',
    poison: 'o',
    ground: 'a',
    rock: 'k',
    bug: 'b',
    ghost: 'h',
    ice: 'i',
    fighting: 'f'
  };

  const typeMultipliers = {
    grass: {
      doubleDamageFrom: ["flying", "poison", "bug", "fire", "ice"],
      doubleDamageTo: ["ground", "rock", "water"],
      halfDamageFrom: ["ground", "water", "grass", "electric"],
      halfDamageTo: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    },
    fire: {
      doubleDamageFrom: ["ground", "rock", "water"],
      doubleDamageTo: ["bug", "steel", "grass", "ice"],
      halfDamageFrom: ["bug", "steel", "fire", "grass", "ice", "fairy"],
      halfDamageTo: ["rock", "fire", "water", "dragon"],
    },
    water: {
      doubleDamageFrom: ["grass", "electric"],
      doubleDamageTo: ["ground", "rock", "fire"],
      halfDamageFrom: ["steel", "water", "fire", "ice"],
      halfDamageTo: ["water", "grass", "dragon"]
    },
    electric: {
      doubleDamageFrom: ["ground"],
      doubleDamageTo: ["flying", "water"],
      halfDamageFrom: ["flying", "steel", "electric"],
      halfDamageTo: ["grass", "electric", "dragon"]
    },
    psychic: {
      doubleDamageFrom: ["bug", "ghost", "dark"],
      doubleDamageTo: ["fighting", "poison"],
      halfDamageFrom: ["fighting", "psychic"],
      halfDamageTo: ["steel", "psychic"]
    },
    dark: {
      doubleDamageFrom: ["fighting", "bug", "fairy"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["ghost", "dark"],
      halfDamageTo:["fighting", "dark", "fairy"]
    },
    steel: {
      doubleDamageFrom: ["fighting", "ground", "fire"],
      doubleDamageTo: ["rock", "ice", "fairy"],
      halfDamageFrom: ["normal", "flying", "rock","bug", "steel", "grass", "psychic", "ice", "dragon", "fairy" ],
      halfDamageTo: ["steel", "water", "fire", "electric"]
    },
    dragon: {
      doubleDamageFrom: ["ice", "dragon", "fairy"],
      doubleDamageTo: ["dragon"],
      halfDamageFrom: ["fire", "water", "grass", "electric"],
      halfDamageTo: ["steel"]
    },
    fairy: {
      doubleDamageFrom: ["poison", "steel"],
      doubleDamageTo: ["fighting", "dragon", "dark"],
      halfDamageFrom: ["fighting", "bug", "dark"],
      halfDamageTo: ["poison", "steel", "fire"]
    },
    normal: {
      doubleDamageFrom: ["fighting"],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: ["rock", "steel"]
    },
    flying: {
      doubleDamageFrom: ["rock", "electric", "ice"],
      doubleDamageTo: ["fighting", "bug", "grass"],
      halfDamageFrom: ["fighting", "bug", "grass"],
      halfDamageTo: ["rock", "steel", "electric"]
    },
    poison: {
      doubleDamageFrom: ["ground", "psychic"],
      doubleDamageTo: ["grass", "fairy"],
      halfDamageFrom: ["fighting", "poison", "bug", "grass", "fairy"],
      halfDamageTo: ["poison", "ground", "rock", "ghost" ],
    },
    ground: {
      doubleDamageFrom: ["water", "grass", "ice"],
      doubleDamageTo: ["poison", "rock", "steel", "fire", "electric"],
      halfDamageFrom: ["poison", "rock"],
      halfDamageTo: ["bug", "grass"]
    },
    rock: {
      doubleDamageFrom: ["fighting", "water", "grass", "steel", "ground"],
      doubleDamageTo: ["flying", "bug", "fire", "ice"],
      halfDamageFrom: ["normal", "flying", "poison", "fire"],
      halfDamageTo: ["fighting", "ground", "steel"]
    },
    bug: {
      doubleDamageFrom: ["flying", "rock", "fire"],
      doubleDamageTo: ["grass", "psychic", "dark"],
      halfDamageFrom: ["fighting", "ground", "grass"],
      halfDamageTo: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy" ]
    },
    ghost: {
      doubleDamageFrom: ["ghost", "dark"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["poison", "bug"],
      halfDamageTo: ["dark"]
    },
    ice: {
      doubleDamageFrom: ["fighting", "rock", "steel", "fire"],
      doubleDamageTo: ["flying", "ground", "grass", "dragon"],
      halfDamageFrom: ["ice"],
      halfDamageTo: ["steel", "fire", "water", "ice"]
    },
    fighting: {
      doubleDamageFrom: ["flying", "psychic", "fairy"],
      doubleDamageTo: ["normal", "rock", "steel", "ice", "dark"],
      halfDamageFrom: ["rock", "bug", "dark"],
      halfDamageTo: ["flying", "poison", "bug", "psychic", "fairy"]
    }

    // ... other types
  };

  
  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    localStorage.setItem("token", token)
    setUserToken(token)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnClick = (prev) => {
    setChecked(!prev);
  }

  const handleSignUp = () => {
    setSignUp(true)
  }

  const handleLogout = () => {
    var keyToRemove = 'token';
  localStorage.removeItem(keyToRemove);
  setUserToken(false)
  setSignUp(false)
  setSelectPokemon(null)
  setTrainerPokemon(null)
  setEnemyPokemon(null)
  setTrainerDialogue("")
  setEnemyDialogue("")
  }

  try {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);
  } catch (error) {
    console.error("Error accessing local storage:", error);
  }

  const endTrainerTurn = () => setTrainerTurn(false)
  const endEnemyTurn = () => setTrainerTurn(true)
  console.log(selectPokemon)

  return (
    <>
    <TrainerContext.Provider value={{
      userToken,
      trainer,
      setTrainer,
      trainerShop,
      setTrainerShop,
      trainerTurn,
      endTrainerTurn,
      endEnemyTurn,
      animateSelect,
      setAnimateSelect,
      animateSelectAttack,
      setAnimateSelectAttack,
      animateEnemyAttack,
      setAnimateEnemyAttack,
      animateColor,
      setAnimateColor,
      animateEnemy,
      setAnimateEnemy,
      trainerItems,
      setTrainerItems,
      trainerPokemon,
      setTrainerPokemon,
      typeToClassname, 
      typeToIcon,
      typeMultipliers, 
      selectPokemon,
      setSelectPokemon,
      enemyPokemon,
      setEnemyPokemon,
      trainerDialogue,
      setTrainerDialogue,
      enemyDialogue,
      setEnemyDialogue,
      rewardDialogue,
      setRewardDialogue,
      victoryMsg,
      setVictoryMsg
      }}>
        <ThemeProvider theme={AppTheme}>
        <CssBaseline/>
      <Router>
      <ResponsiveAppBar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login checked={checked} handleOnClick={handleOnClick} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} token={userToken} signUp={signUp} handleSignUp={handleSignUp}/>} />
          <Route path="pokemon" element={<TrainerPokes />} />
          <Route path="battle" element={<Trainer /> } /> 
          <Route path="shop" element={<Shop />} />
          <Route path="items" element={<Items />} />
        </Routes>
      </Router>
      </ThemeProvider>
      </TrainerContext.Provider>
    </>
  )
}

export default App
