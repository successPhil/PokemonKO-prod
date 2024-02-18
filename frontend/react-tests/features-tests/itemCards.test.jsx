import TrainerItemsCard from '../../src/features/ItemCards/TrainerItemsCard'
import TrainerShopCard from '../../src/features/ItemCards/TrainerShopCard'
import {expect, test} from 'vitest'

test("Trainer Item and Shop Cards render without crashing", ()=>{
    const trainerItemCard = <TrainerItemsCard/>
    expect(trainerItemCard).toMatchSnapshot()
    const trainerShopCard = <TrainerShopCard/>
    expect(trainerShopCard).toMatchSnapshot()
})