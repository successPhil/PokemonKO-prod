import Pokeball from "../../styles/Pokeball";
import TypingEffect from "../../styles/Typewriter";
import './styles/gameboyDialogue.css'

export default function GameDialogue({text, isMobile}) {
  const mobileView = isMobile ? "mobile-" : ""

  return (
    <div className={`${mobileView}gameboy-dialogue-container`}>
      <div className={`${mobileView}gameboy-dialogue-box`}>
        <div className={`${mobileView}dialogue-content`}>
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

