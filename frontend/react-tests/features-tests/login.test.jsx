import LoginSnack from '../../src/features/Login/LoginSnack'
import SignIn from '../../src/features/Login/SignIn'
import {expect, test} from 'vitest'

test("Login feature components render without crashing", ()=> {
    const loginSnack = <LoginSnack/>
    expect(loginSnack).toMatchSnapshot()
    const signIn = <SignIn/>
    expect(signIn).toMatchSnapshot()
})