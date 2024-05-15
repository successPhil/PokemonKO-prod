import PokemonTypesList from "../features/PokeCards/PokemonTypesList";
import './styles/pokedex.css'

const Pokedex = () => {
    return (
        <div className="pokedex-container">
            <div className="pokedex-content">
        <h1>Use the pokedex to see what pokemon are available in this game!</h1>
        <PokemonTypesList />
            </div>
        </div>
    )
}

export default Pokedex;