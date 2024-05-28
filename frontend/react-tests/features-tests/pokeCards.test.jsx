import BasicModal from '../../src/features/PokeCards/MovesModal'
import PokeCard from '../../src/features/PokeCards/PokeCard'

import { expect, test } from 'vitest'

test("PokeCards features render without crashing", ()=>{
    const movesCard = <BasicModal/>
    expect(movesCard).toMatchSnapshot()
    const pokeCard = <PokeCard />
    expect(pokeCard).toMatchSnapshot()
})