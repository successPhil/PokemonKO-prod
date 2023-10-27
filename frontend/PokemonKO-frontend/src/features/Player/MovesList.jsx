import Pokeball from "../../styles/Pokeball";
import MovesListItem from "./MovesListItem";
export default function MovesList({moves, endTrainerTurn, trainerTurn, toggleMenu, openMoves, selectPokemon, trainerDialogue, setTrainerDialogue, enemyPokemon, playerAttack}) {
    return (<div className="gameboy-moves-container">
    <div className='gameboy-move-container'>
        {moves.map((move) => (<MovesListItem move={move} key={move.id} endTrainerTurn={endTrainerTurn} trainerTurn={trainerTurn} toggleMenu={toggleMenu} openMoves={openMoves} selectPokemon={selectPokemon} trainerDialogue={trainerDialogue} setTrainerDialogue={setTrainerDialogue} enemyPokemon={enemyPokemon} playerAttack={playerAttack} />))}
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

