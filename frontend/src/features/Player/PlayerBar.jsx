import React from 'react';

export default function PlayerBar({ isPlayer, isMobile }) {
  const containerClass = isPlayer ? 'player-bar' : 'enemy-bar';
 
  

  return (
    <>
    {!isMobile ? (
       <div className={containerClass}>
       <div className='horizontal-bar'></div>
       <div className='vertical-bar'></div>
     </div>

    ): (
      <div className={`mobile-${containerClass}`}>
      <div className='mobile-horizontal-bar'></div>
      <div className='mobile-vertical-bar'></div>
    </div>

    )}
   
    </>
    
  );
}
