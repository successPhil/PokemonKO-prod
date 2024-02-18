import MovesCard from '../../src/features/PokeCards/MovesCard'
import MovesPop from '../../src/features/PokeCards/MovesPop'
import PokeCard from '../../src/features/PokeCards/PokeCard'

import { expect, test } from 'vitest'

test("PokeCards features render without crashing", ()=>{
    const movesCard = <MovesCard/>
    expect(movesCard).toMatchSnapshot()
    const movesPop = <MovesPop />
    expect(movesPop).toMatchSnapshot()
    const pokeCard = <PokeCard />
    expect(pokeCard).toMatchSnapshot()
})