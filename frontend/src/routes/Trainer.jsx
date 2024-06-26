import GameMenu from "../features/FightMenu/GameMenu"
import GameDialogue from "../features/Dialogue/GameDialogue"
import PlayerData from "../features/Player/PlayerData"
import EnemyData from "../features/Enemy/EnemyData"
import MovesList from "../features/Player/MovesList"
import GetEnemyButton from "../features/Player/GetEnemyButton"
import RewardBox from "../features/Dialogue/RewardBox"
import TrainerContext from "../contexts/TrainerContext"
import { useContext, useState, useEffect } from "react"
import { capitalizeFirst } from "../features/Enemy/EnemyData"
import { updateBattleResults, getEnemyPokemon, replenishShop } from "../api/authApi"
import { typeMultipliers } from "../constants/typeMultipliers"

import '../features/Enemy/styles/enemy.css'
import '../features/Player/styles/player.css'
import '../features/Dialogue/styles/rewardbox.css'


import { useMediaQuery } from "@mui/material"
import MobileEnemy from "../features/Enemy/MobileEnemy"
import MobilePlayer from "../features/Player/MobilePlayer"

import { useNavigate } from "react-router-dom"

export default function Trainer(){ 
    const { trainerTurn, endTrainerTurn, endEnemyTurn, enemyPokemon, setEnemyPokemon, selectPokemon, setSelectPokemon, enemyDialogue, setEnemyDialogue, trainerDialogue, setTrainerDialogue,victoryMsg, setVictoryMsg, rewardDialogue, setRewardDialogue, setAnimateSelect, setAnimateEnemy,  animateSelectAttack, setAnimateSelectAttack, animateEnemyAttack, setAnimateEnemyAttack, setAnimateColor } = useContext(TrainerContext);
    const [ openMoves, setOpenMoves ] = useState(false)
    const [ showRewards, setShowRewards ] = useState(false)
    const navigate = useNavigate()

    const isMobile = useMediaQuery('(max-width: 768px)');

    const clearEnemy = (resultMessage) => {
        setEnemyPokemon(null)
        setShowRewards(true)
        setEnemyDialogue(resultMessage)
    }

    const clearSelect = (lose_msg) => {
        setSelectPokemon(null)
        setEnemyDialogue(lose_msg)
    }

    const hideRewards = () => {
        setShowRewards(false)
    }

    const animateSelectedAttack = (move) => {
        setAnimateSelect(true)
        setAnimateColor(move.type)
        setTimeout(() => {
            setAnimateSelect(false);
            animateSelectAttackType()
            
        }, 400); // Adjust the duration as needed 
    }

    const animateSelectAttackType = () => {
        setAnimateSelectAttack(true)
        setTimeout(() => {
            setAnimateSelectAttack(false)
        }, 400)
    }

    const animateEnemyAttackType = () => {
        setAnimateEnemyAttack(true)
        setTimeout(() => {
            setAnimateEnemyAttack(false)
        }, 400)
    }

    const animateEnemyAttackHandler = () => {
        setAnimateEnemy(true)
       
        setTimeout(() => {
            setAnimateEnemy(false);
            animateEnemyAttackType()
        }, 400); // Adjust the duration as needed 
    }

    const randomNumber = () => {
        return Math.ceil(Math.random() * 100)
    }

    const chooseEnemy = (pokemon) => {
        const chance = randomNumber()

        if (chance > 40){
            replenishShop()
        }
        const enemyStr = `A wild ${capitalizeFirst(pokemon.name)} has appeared!`
        setEnemyDialogue(enemyStr)
        setEnemyPokemon(pokemon)
        endEnemyTurn()
    }

    async function fetchEnemy() {
        if (!enemyPokemon){
            const enemy = await getEnemyPokemon()
            chooseEnemy(enemy)
        }
        }

    const calculateType = (attackPokemon, attackMove, defensePokemon) => {
        const defenseTypeList = defensePokemon.types.split("-")
        const attackTypeList = attackPokemon.types.split("-")
        let pokemonBonus = 1
        let moveBonus = 1

        for (const type of defenseTypeList){
            let bonusList = typeMultipliers[type]

            for (const type of attackTypeList){
                if (bonusList.doubleDamageFrom.includes(type)){
                    pokemonBonus *=2
                }
                if (bonusList.halfDamageFrom.includes(type)){
                    pokemonBonus *= 0.5
                }
                if (bonusList.doubleDamageFrom.includes(attackMove.type)){
                    moveBonus *= 2
                }
                if (bonusList.halfDamageFrom.includes(attackMove.type)){
                    moveBonus *= 0.5
                }

            }
        }

        return {pokemonBonus, moveBonus}
    }


// resultMessage we added to update results field with data from updateBattle
    async function updateBattle(selectPokemon, battleResults, money, experience, resultMessage) {
        if (battleResults == 'win'){
            const updated = await updateBattleResults(selectPokemon, battleResults, money, experience)
            setSelectPokemon(updated)
            clearEnemy(resultMessage)
        } else {
            clearSelect(resultMessage)
            updateBattleResults(selectPokemon, battleResults, experience, money)
        }
    }

  
    const toggleMenu = (prev) => {setOpenMoves(!prev)}

    const selectRandomMove = (moves) => {
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
      }


    const playerAttack = async (selectPokemon, move, enemyPokemon) => {
    const randomMultiplier = Math.floor(Math.random() * 5) + 2; // Generates a random integer between 2 and 6
    const {pokemonBonus, moveBonus } = calculateType(selectPokemon, move, enemyPokemon) //Order matters - attacking poke, move being used, defending poke
    const bonus = pokemonBonus * moveBonus
    const basePokemonDamage = Math.ceil(1.8 * selectPokemon.power * pokemonBonus)
    const baseMoveDamage = Math.floor((move.damage * moveBonus * randomMultiplier))
    const baseDamage = basePokemonDamage + baseMoveDamage
    const baseDefense = Math.ceil((enemyPokemon.power / 5) + enemyPokemon.defense)
    let damage = 1
    if (baseDamage < baseDefense){
        damage = baseDamage
    } else {
        damage = baseDamage - baseDefense
    }
    let bonusStr = ""
    if (bonus > 1){
        bonusStr = "It's super effective!!!"
    }
    if (bonus < 1){
        bonusStr = "It's not very effective..."
    }

    const attack_msg = `${capitalizeFirst(selectPokemon.name)} used ${capitalizeFirst(move.name)} on ${capitalizeFirst(enemyPokemon.name)} dealing ${damage} damage! ${bonusStr}`

    if (enemyPokemon.health - parseInt(damage) <= 0){
        const money = (selectPokemon.level * selectPokemon.power) + (enemyPokemon.level +  enemyPokemon.power)
        const experience = enemyPokemon.level * selectPokemon.power
        const victory_msg = `${capitalizeFirst(selectPokemon.name)} has defeated ${capitalizeFirst(enemyPokemon.name)} in battle! ${capitalizeFirst(enemyPokemon.name)} has been added to your inventory of Pokemon.`
        const rewardMessage = `${victory_msg} ${capitalizeFirst(selectPokemon.name)} has gained ${experience} exp from battle! You have gained ${money} KO coins!!`
        updateBattle(selectPokemon, 'win', money, experience, attack_msg)
        setVictoryMsg(attack_msg)
        setRewardDialogue(rewardMessage)
        animateSelectedAttack(move)
    } else {
        const after_attack = enemyPokemon
        after_attack.health -= damage
        setEnemyPokemon(after_attack)
        setTrainerDialogue(attack_msg)
       animateSelectedAttack(move)
        
        endTrainerTurn()
    }
    return damage;
    };
   

    const enemyAttack = async (enemyPokemon, selectPokemon) => {
        if (!selectPokemon){
            endEnemyTurn()
        }
      
    if (enemyPokemon && selectPokemon){
        const move = selectRandomMove(enemyPokemon.moves)
        setAnimateColor(move.type)
        const randomMultiplier = Math.floor(Math.random() * 5) + 2;
        const {pokemonBonus, moveBonus } = calculateType(enemyPokemon, move, selectPokemon)
        const bonus = pokemonBonus * moveBonus
        const basePokemonDamage = Math.ceil(1.8 * enemyPokemon.power * pokemonBonus)
        console.log(basePokemonDamage, 'BASE ENEMY DAMAGE')
        const baseMoveDamage = Math.floor((move.damage * moveBonus * randomMultiplier))
        const baseDamage = basePokemonDamage + baseMoveDamage
        const baseDefense = Math.ceil((selectPokemon.power / 5) + selectPokemon.defense)
        console.log(baseDefense, 'BASE PLAYER DEFENSE')
        let damage = 1
        if (baseDamage < baseDefense){
            damage = baseDamage
        } else {
            damage = baseDamage - baseDefense
        }
       
        let bonusStr = ""
        if (bonus > 1){
            bonusStr = "It's super effective!!!"
        }
        if (bonus < 1){
            bonusStr = "It's not very effective..."
        }

        const attackMessage = `${capitalizeFirst(enemyPokemon.name)} used ${capitalizeFirst(move.name)} on ${capitalizeFirst(selectPokemon.name)} dealing ${damage} damage! ${bonusStr}`
        const resultMessage = `${capitalizeFirst(selectPokemon.name)} has been defeated by ${capitalizeFirst(enemyPokemon.name)}! ${capitalizeFirst(selectPokemon.name)} storms off in a hurry!`


        if (selectPokemon.health - parseInt(damage)<= 0){
            updateBattle(selectPokemon, 'lose', 100, 0, resultMessage)
        }
        else {
            setSelectPokemon(prevSelectPokemon => ({
                ...prevSelectPokemon,
                health: prevSelectPokemon.health - damage}))
            setEnemyDialogue(attackMessage);
        }

        await new Promise(resolve => setTimeout(resolve, 2000)); // Add a delay to simulate the attack animation
        
        endEnemyTurn();
    }
    }

    useEffect(() => {
        if (!selectPokemon) {
            setTimeout(() => {
                navigate('/pokemon')

            }, 5000)
        }
    }, [selectPokemon])

    useEffect(() => {
        if (!trainerTurn ) {
            const timeout = setTimeout(() => {
                if (enemyPokemon && selectPokemon){
                    enemyAttack(enemyPokemon, selectPokemon);
                    animateEnemyAttackHandler()
                }
            }, 5000);
            return () => clearTimeout(timeout); // Cleanup the timeout on component cleanup
        }
    }, [trainerTurn])

  
    return (
        <>
        {!isMobile && showRewards && 
        <div onClick={hideRewards}>
          <RewardBox text={rewardDialogue}/>
          </div>
        }

        {isMobile && showRewards && 
        <div onClick={hideRewards}>
          <RewardBox isMobile={true} text={rewardDialogue}/>
          </div>
        }

        {!isMobile &&  !enemyPokemon && 
        <div onClick={fetchEnemy}>
        <GetEnemyButton/>
        </div>
        }
      
        {isMobile &&  !enemyPokemon && 
        <div onClick={fetchEnemy}>
        <GetEnemyButton isMobile={true}/>
        </div>
        }
        
        {!isMobile && selectPokemon && (
        <PlayerData
        />
        
        )}
        {!isMobile && enemyPokemon && (
        <EnemyData
        />
        )}

{isMobile && enemyPokemon && (
        <MobileEnemy/>
        )}
{isMobile && selectPokemon && (
    <MobilePlayer/>
)}
        {!enemyPokemon && trainerTurn && !isMobile && <GameDialogue text={victoryMsg} />}
        {trainerTurn && enemyPokemon && !isMobile &&  <GameDialogue text={enemyDialogue} />}
        {trainerTurn && !enemyPokemon && !isMobile &&  <GameDialogue text={enemyDialogue} />}
        {!trainerTurn && !isMobile && <GameDialogue  text={trainerDialogue} />}

        {!enemyPokemon && trainerTurn && isMobile && <GameDialogue text={victoryMsg} isMobile={true} />}
        {trainerTurn && enemyPokemon && isMobile &&  <GameDialogue text={enemyDialogue} isMobile={true} />}
        {trainerTurn && !enemyPokemon && isMobile &&  <GameDialogue text={enemyDialogue} isMobile={true} />}
        {!trainerTurn && isMobile && <GameDialogue text={trainerDialogue} isMobile={true} />}





        {selectPokemon && !isMobile &&<GameMenu moves={selectPokemon.moves} toggleMenu={toggleMenu} openMoves={openMoves} />}

        {selectPokemon && isMobile &&<GameMenu moves={selectPokemon.moves} toggleMenu={toggleMenu} openMoves={openMoves} isMobile={true} />}

        {selectPokemon && openMoves && !isMobile &&  (
        <MovesList
            moves={selectPokemon.moves}
            endTrainerTurn={endTrainerTurn}
            trainerTurn={trainerTurn}
            toggleMenu={toggleMenu}
            openMoves={openMoves}
            selectPokemon={selectPokemon}
            trainerDialogue={trainerDialogue}
            setTrainerDialogue={setTrainerDialogue}
            enemyPokemon={enemyPokemon}
            playerAttack={playerAttack}
        />
        )}

        {selectPokemon && openMoves && isMobile &&  (
        <MovesList
            isMobile={true}
            moves={selectPokemon.moves}
            endTrainerTurn={endTrainerTurn}
            trainerTurn={trainerTurn}
            toggleMenu={toggleMenu}
            openMoves={openMoves}
            selectPokemon={selectPokemon}
            trainerDialogue={trainerDialogue}
            setTrainerDialogue={setTrainerDialogue}
            enemyPokemon={enemyPokemon}
            playerAttack={playerAttack}
        />
        )}

    </>
    );
}