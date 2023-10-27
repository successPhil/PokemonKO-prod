import React from 'react';
import { motion } from 'framer-motion';
import GameText from '../../styles/PokemonGB';

const ProgressBar = ({ value, maxValue, barColor }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div
      style={{
        width: '500px',
        height: '31px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: barColor || '#4caf50',
          borderRadius: '16px',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <GameText
        className='bar'
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: '000000',
            // visibility: 'hidden', // Initially hide the text
          }}
        >
          {`${value}/${maxValue}`}
        </GameText>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
