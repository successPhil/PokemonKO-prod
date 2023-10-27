import Pokeball from "../../styles/Pokeball";
import TypingEffect from "../../styles/Typewriter";

export default function GameDialogue({text}) {

  return (
    <div className='gameboy-dialogue-container'>
      <div className='gameboy-dialogue-box'>
        <div className='dialogue-content'>
        {text && <TypingEffect text={text} /> }
        </div>
      </div>
      <div className="top-left">
        <Pokeball />
      </div>
      <div className="top-right">
        <Pokeball />
      </div>
      <div className="bottom-left">
        <Pokeball />
      </div>
      <div className="bottom-right">
        <Pokeball />
      </div>
    </div>
  );
}

