import { motion } from "framer-motion"
import TrainerContext from "../../contexts/TrainerContext"
import { useContext } from "react"

export default function PlayerAttack() {
    const { animateSelectAttack , animateColor, selectPokemon} = useContext(TrainerContext)

    const pokeTypes = selectPokemon.types.split(", ")

    return (
        <motion.div
        className="player-attack"
        initial={{x:800, y:170}}
        animate={animateSelectAttack ? { x: 1200, y: 0, rotate: 0 } : { x: 800, y: 170, rotate: 0 }}
        transition={{ duration: 0.4 }}
        >
            <div>
        <span className={`pokeball-attack ${animateColor}`}>Z</span>
        <span className={`pokeball-attack ${pokeTypes[0]}`} >u</span>
      </div>
        </motion.div>
    )
}