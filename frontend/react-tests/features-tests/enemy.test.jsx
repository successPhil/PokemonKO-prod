import EnemyAttack from '../../src/features/Enemy/EnemyAttack'
import EnemyData from '../../src/features/Enemy/EnemyData'
import EnemyImage from '../../src/features/Enemy/EnemyImage'
import {expect, test} from 'vitest'

test("Enemy attack, data, and image renders without crashing", ()=> {
    const enemyAttack = <EnemyAttack/>
    expect(enemyAttack).toMatchSnapshot()
    const enemyData = <EnemyData/>
    expect(enemyData).toMatchSnapshot()
    const enemyImage = <EnemyImage/>
    expect(enemyImage).toMatchSnapshot()
})