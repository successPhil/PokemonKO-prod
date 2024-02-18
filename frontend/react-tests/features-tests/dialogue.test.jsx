import GameDialogue from '../../src/features/Dialogue/GameDialogue'
import RewardBox from '../../src/features/Dialogue/RewardBox'
import {expect, test} from 'vitest'


test("Game Dialogue renders without crashing", ()=>{
    const gameDialogue = <GameDialogue/>
    expect(gameDialogue).toMatchSnapshot()

    const rewardBox = <RewardBox />
    expect(rewardBox).toMatchSnapshot()

})