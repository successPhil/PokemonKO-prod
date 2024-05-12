import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Trainer from './routes/Trainer'
import Pokedex from "./routes/Pokedex"
import Intro from './routes/Intro'
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
  const [trainerShop, setTrainerShop] = useState([]);



  const getItems = async () => {
  const items = await getTrainerItems()
  setTrainerItems(items)
}

  const getTrainerPokes = async () => {
    const trainerPokes = await getTrainerPokemon()
    setTrainerPokemon(trainerPokes)
  }

  const getGamePokes = async () => {
    const gamePokes = await getGamePokemon()
  }

  const getUserTrainer = async () => {
    const userTrainer = await getTrainer()
    setTrainer(userTrainer)
  }

  const getUserShop = async () => {
    const shop = await getTrainerShop()
    setTrainerShop(shop)
  }
  

  useEffect(() => {
    getGamePokes()
    const token = localStorage.getItem('token');
   
    if (token) {
      setUserToken(token);
      getItems()
      getUserTrainer()
      getUserShop()
      getTrainerPokes()
      
    }
  }, []);

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

  const endTrainerTurn = () => setTrainerTurn(false)
  const endEnemyTurn = () => setTrainerTurn(true)


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
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login checked={checked} handleOnClick={handleOnClick} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} token={userToken} signUp={signUp} handleSignUp={handleSignUp}/>} />
          <Route path="pokemon" element={<TrainerPokes />} />
          <Route path="battle" element={<Trainer /> } /> 
          <Route path="shop" element={<Shop />} />
          <Route path="items" element={<Items />} />
          <Route path="pokedex" element={<Pokedex />} />
        </Routes>
      </Router>
      </ThemeProvider>
      </TrainerContext.Provider>
    </>
  )
}

export default App
