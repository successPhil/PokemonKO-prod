import charizard from '../images/charizard-front-attack.png'
import jolteon from '../images/jolteon-player-attack.png'
import SignInButton from '../features/SignInButton/SignInButton'
import './styles/intro.css'

const Intro = () => {
    return (
        <>
          <div className="home-container">
            
            <div className='intro-container'>
                <div className='top-image-container'>
                    <img src={charizard} alt="charizard" className="intro-pokes" />
                </div>
                <div className='bot-image-container'>
                    <img src={jolteon} alt="jolteon" className="intro-pokes" />
                </div>
            </div>

            <SignInButton/>
            </div>
        </>
    )
}

export default Intro;
