import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 40); // Adjust the speed of typing here (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [text, currentIndex]);

  return <div>{displayedText}</div>;
};

export default TypingEffect;
