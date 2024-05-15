import GameText from "../../styles/PokemonGB"
import ProgressBar from "../ProgressBar/ProgressBar"
import PlayerBar from "./PlayerBar"
import { capitalizeFirst } from "../Enemy/EnemyData";
import TrainerContext from "../../contexts/TrainerContext";
import { useContext } from "react";
import SelectImage from "./SelectImage";
import PlayerAttack from "./PlayerAttack";

export default function MobilePlayer(){
    const { selectPokemon, animateSelectAttack } = useContext(TrainerContext)
    const isPlayer = true;
    if (selectPokemon){
        return(<>
        <SelectImage selectImage={selectPokemon.back_image_url}/>
        {animateSelectAttack && <PlayerAttack />}
        <PlayerBar isPlayer={isPlayer} isMobile={true}/>
        <div className="mobile-player-name">
        <GameText>{capitalizeFirst(selectPokemon.name)}</GameText>
        </div>
        <div className="mobile-player-level">
            <GameText>LVL:{selectPokemon.level}</GameText>
        </div>
        <div className="mobile-player-health-bar">
        <GameText>HP: </GameText>
        <ProgressBar  value={selectPokemon.health} maxValue={selectPokemon.max_health} barColor={'#DA2C38'} />
        </div>
        <div className="mobile-player-xp-bar">
        <GameText>XP:</GameText>
        <ProgressBar value={selectPokemon.experience} maxValue={selectPokemon.totalXP} barColor={'#D5E5AE'}/>
        </div>
        </>) 
    }
}