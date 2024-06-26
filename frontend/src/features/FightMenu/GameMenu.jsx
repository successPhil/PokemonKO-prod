import Pokeball from "../../styles/Pokeball";
import MenuButton from "./MenuButton";
import { trainerRun } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TrainerContext from "../../contexts/TrainerContext";
import './styles/gameMenu.css'

export default function GameMenu({ openMoves, toggleMenu, isMobile}) {
  const { setEnemyPokemon } = useContext(TrainerContext)
  const mobileView = isMobile ? "mobile-" : ""

  const navigate = useNavigate()

  const handleFightClick = () => {
    toggleMenu(openMoves)
  }

  const navToItems = () => {
    return navigate("/items")
  }

  const handleRun = () => {
    trainerRun()
    setEnemyPokemon(null)

  }

  return (
    <div className={`${mobileView}gameboy-menu-container`}>
      <div className={`${mobileView}gameboy-menu-box`}>
        <div className={`${mobileView}menu-content`}>
        <div className="button-row">
        <MenuButton label="FIGHT" onClick={(handleFightClick)}  />
      <MenuButton label="POKE"  />
      </div>
      <div className="button-row">
      <MenuButton label="ITEMS" onClick={(navToItems)}  />
      <MenuButton label="RUN" onClick={handleRun}  />
      </div>
        </div>
      </div>
      <div className="top-left">
        <Pokeball />
      </div>
      <div className="top-right">
        <Pokeball />
      </div>
      <div className="bottom-left">
        <Pokeball />
      </div>
      <div className="bottom-right">
        <Pokeball />
      </div>
    </div>
  );
}
