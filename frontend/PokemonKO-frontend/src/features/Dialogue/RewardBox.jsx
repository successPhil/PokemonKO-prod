import TypingEffect from "../../styles/Typewriter"
export default function RewardBox({text}) {
    return(
        <>
        <div className='reward-box-container'>
            <div className='gameboy-menu-box'>
                <div className='reward-box-content'> {text && <TypingEffect text={text} /> }</div>
      </div>
    </div>
      
        </>
    )
}