import GetEnemyButton from '../../src/features/Player/GetEnemyButton'
import MovesList from '../../src/features/Player/MovesList'
import MovesListItem from '../../src/features/Player/MovesListItem'
import PlayerAttack from '../../src/features/Player/PlayerAttack'
import PlayerBar from '../../src/features/Player/PlayerBar'
import PlayerData from '../../src/features/Player/PlayerData'
import SelectImage from '../../src/features/Player/SelectImage'

import { expect, test } from 'vitest'

test("Player feature components render without crashing", ()=>{
    const getEnemyButton = <GetEnemyButton />
    expect(getEnemyButton).toMatchSnapshot()
    const movesList = <MovesList/>
    expect(movesList).toMatchSnapshot()
    const movesListItem = <MovesListItem />
    expect(movesListItem).toMatchSnapshot()
    const playerAttack = <PlayerAttack />
    expect(playerAttack).toMatchSnapshot()
    const playerBar = <PlayerBar />
    expect(playerBar).toMatchSnapshot()
    const playerData = <PlayerData />
    expect(playerData).toMatchSnapshot()
    const selectImage = <SelectImage />
    expect(selectImage).toMatchSnapshot()
} )