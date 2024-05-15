export default function GetEnemyButton ({isMobile}) {
    const mobileView = isMobile ? "mobile-" : ""
    return (
        <>
        <div className={`${mobileView}get-enemy-container`}>
            <div className={`${mobileView}gameboy-menu-box`}>
                <div className={`${mobileView}get-enemy-content`}>Fight!</div>
      </div>
    </div>
        </>
    )
}