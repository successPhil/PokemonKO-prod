import GameText from "../../styles/PokemonGB"
import ProgressBar from "../ProgressBar/ProgressBar"
import PlayerBar from "./PlayerBar"
import { capitalizeFirst } from "../Enemy/EnemyData";
import TrainerContext from "../../contexts/TrainerContext";
import { useContext } from "react";
import SelectImage from "./SelectImage";
import PlayerAttack from "./PlayerAttack";

export default function PlayerData(){
    const { selectPokemon, animateSelectAttack } = useContext(TrainerContext)
    const isPlayer = true;
    if (selectPokemon){
        return(<>
        <SelectImage selectImage={selectPokemon.back_image_url}/>
        {animateSelectAttack && <PlayerAttack />}
        <PlayerBar isPlayer={isPlayer}/>
        <div className="player-name">
        <GameText>{capitalizeFirst(selectPokemon.name)}</GameText>
        </div>
        <div className="player-level">
            <GameText>LVL:{selectPokemon.level}</GameText>
        </div>
        <div className="player-health-bar">
        <GameText>HP: </GameText>
        <ProgressBar  value={selectPokemon.health} maxValue={selectPokemon.max_health} barColor={'#DA2C38'} />
        </div>
        <div className="player-xp-bar">
        <GameText>XP:</GameText>
        <ProgressBar value={selectPokemon.experience} maxValue={selectPokemon.totalXP} barColor={'#D5E5AE'}/>
        </div>
        </>) 
    }
}