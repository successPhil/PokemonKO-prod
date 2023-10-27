import GameText from "../../styles/PokemonGB"
import ProgressBar from "../ProgressBar/ProgressBar"
import PlayerBar from "../Player/PlayerBar"
import TrainerContext from "../../contexts/TrainerContext"
import { useContext } from "react"
import EnemyImage from "./EnemyImage"
import EnemyAttack from "./EnemyAttack"

export function capitalizeFirst(name){
    return name[0].toUpperCase() + name.slice(1)

}

export default function EnemyData() {
    const { enemyPokemon, animateEnemyAttack } = useContext(TrainerContext)

    if (enemyPokemon){
        return (<>
        <EnemyImage enemyImage={enemyPokemon.front_image_url}/>
        {animateEnemyAttack && <EnemyAttack />}
        <PlayerBar /> 
        <div className="enemy-name">
            <GameText>{capitalizeFirst(enemyPokemon.name)}</GameText>
        </div>
        <div className="enemy-level">
            <GameText>LVL:{enemyPokemon.level}</GameText>
        </div>
        <div className="enemy-health-bar">
        <GameText>HP:</GameText>
        <ProgressBar value={enemyPokemon.health} maxValue={enemyPokemon.max_health} barColor={'#DA2C38'} />
        </div>
        </> )
    }
    }
