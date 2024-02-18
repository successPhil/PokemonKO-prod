import GameMenu from '../../src/features/FightMenu/GameMenu'
import MenuButton from '../../src/features/FightMenu/MenuButton'
import {expect, test} from 'vitest'

test("FightMenu components render without crashing", ()=> {
    const gameMenu = <GameMenu/>
    expect(gameMenu).toMatchSnapshot()
    const menuButton = <MenuButton/>
    expect(menuButton).toMatchSnapshot()
    
})