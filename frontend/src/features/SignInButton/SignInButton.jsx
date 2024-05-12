import { Link } from "react-router-dom";
import './styles/signinbutton.css'
const SignInButton = () => {
    return (
        <>
       <Link to="/login" style={{'text-decoration': 'none'}}>
        <div className="intro-signin-container">
            <div className="intro-signin-btn">
                Sign In
            </div>
        </div>
        </Link>
        </>
    )
}

export default SignInButton;