import Pokeball from "../../styles/Pokeball";
import MovesListItem from "./MovesListItem";
import './styles/movesMenu.css'
export default function MovesList({isMobile, moves, endTrainerTurn, trainerTurn, toggleMenu, openMoves, selectPokemon, trainerDialogue, setTrainerDialogue, enemyPokemon, playerAttack}) {
    const mobileView = isMobile ? "mobile-" : ""
    return (<div className={`${mobileView}gameboy-moves-container`}>
    <div className={`mobile-gameboy-move-container`}>
        {moves.map((move) => (<MovesListItem isMobile={isMobile} move={move} key={move.id} endTrainerTurn={endTrainerTurn} trainerTurn={trainerTurn} toggleMenu={toggleMenu} openMoves={openMoves} selectPokemon={selectPokemon} trainerDialogue={trainerDialogue} setTrainerDialogue={setTrainerDialogue} enemyPokemon={enemyPokemon} playerAttack={playerAttack} />))}
    </div>
    <div className="top-left-menu">
        <Pokeball />
      </div>
      <div className="top-right-menu">
        <Pokeball />
      </div>
      <div className="bottom-left-menu">
        <Pokeball />
      </div>
      <div className="bottom-right-menu">
        <Pokeball />
      </div>

    </div>)
}

