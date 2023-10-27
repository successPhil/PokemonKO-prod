import TrainerContext from "../../contexts/TrainerContext";
import { useContext } from "react";
import { capitalizeFirst } from "../Enemy/EnemyData";
export default function MovesListItem({move, trainerTurn, toggleMenu, openMoves, selectPokemon, enemyPokemon, playerAttack}){
    const upperMove = capitalizeFirst(move.name)
    const { typeToClassname, typeToIcon} = useContext(TrainerContext);
    const typeClassName = typeToClassname[move.type];
    const icon = typeToIcon[move.type];
    const iconClassName = 'pokemon-type-icon'

    
    const handleClickMove = (move) => {
        if (trainerTurn){
            playerAttack(selectPokemon, move, enemyPokemon)
            toggleMenu(openMoves)
           
        }
    }

    return (
    <>
       <div className='gameboy-move-box' onClick={()=> handleClickMove(move)}>
        <div className='move-content' >
       <div className={`${iconClassName} ${typeClassName}`} >{icon}</div><div>{upperMove}</div>
        </div>
      </div>
    </>)

}