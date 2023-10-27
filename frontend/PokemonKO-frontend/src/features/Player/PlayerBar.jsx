import React from 'react';

export default function PlayerBar({ isPlayer }) {
  const containerClass = isPlayer ? 'player-bar' : 'enemy-bar';

  return (
    <div className={containerClass}>
      <div className='horizontal-bar'></div>
      <div className='vertical-bar'></div>
    </div>
  );
}
