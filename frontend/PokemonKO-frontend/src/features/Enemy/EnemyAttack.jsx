import { motion } from "framer-motion"
import TrainerContext from "../../contexts/TrainerContext"
import { useContext } from "react"

export default function EnemyAttack() {
    const { animateEnemyAttack , animateColor, selectPokemon} = useContext(TrainerContext)
    let pokeType = ""

    if (selectPokemon){
        pokeType = selectPokemon.types.split(", ")[0]
    }

    return (
        <motion.div
        className="enemy-attack"
        initial={{x:1000, y:170}}
        animate={animateEnemyAttack ? { x: 750, y: 260, rotate: 0 } : { x: 1000, y: 170, rotate: 0 }}
        transition={{ duration: 0.4 }}
        >
            <div>
        <span className={`pokeball-attack ${animateColor}`}>Z</span>
        <span className={`pokeball-attack ${pokeType}`} >u</span>
      </div>
        </motion.div>
    )
}