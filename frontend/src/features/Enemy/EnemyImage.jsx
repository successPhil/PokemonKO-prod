import { motion } from "framer-motion"
import TrainerContext from "../../contexts/TrainerContext"
import { useContext } from "react"
export default function EnemyImage({enemyImage}){
    const { animateEnemy } = useContext(TrainerContext)
    // console.log(animateEnemy, 'INSIDE ENEMY IMAGE COMPONENT')
    return (
    <motion.div 
        initial={{x:0, y:0}}
        animate={animateEnemy ? { x: -200, y: 130, rotate: -30 } : { x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 0.4 }} // Adjust the duration as needed 
        className="enemy-image">      
    <img src={enemyImage} style={{
      height: '420px',
      width: '100%', // This will make the image take up the full width of its container
      objectFit: 'contain', // This ensures the image is contained within the specified height and width
    }}
    />
    </motion.div>)

}