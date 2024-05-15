import TypingEffect from "../../styles/Typewriter"
export default function RewardBox({text , isMobile}) {
    const mobileView = isMobile ? "mobile-" : ""
    return(
        <>
        <div className={`${mobileView}reward-box-container`}>
            <div className={`${mobileView}gameboy-menu-box`}>
                <div className={`${mobileView}reward-box-content`}> {text && <TypingEffect text={text} /> }</div>
      </div>
    </div>
      
        </>
    )
}