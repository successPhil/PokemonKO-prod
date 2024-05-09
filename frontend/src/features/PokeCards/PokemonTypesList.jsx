import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_TYPE } from "../../api/pokemon";
import { useState } from "react";
import './styles/pokemon.css'
import { pokemonTypes } from "../../constants/pokemonTypes";
import { typesToClass } from "../../utils/pokemonTypes";



const PokemonTypesList = () => {
    const [selectedType, setSelectedType ] = useState("")

   
    
    const handleChange = (event) => {
        setSelectedType(event.target.value)
    }

    const { loading, error, data } = useQuery(GET_POKEMON_BY_TYPE, {
        variables: { type: selectedType}
    })
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error </p>
    }


    const pokemonTypeData = data?.pokemonByType || []
    

   



    return (
        <div className="types-route-container">
            <label className="pokemon-select-label">
                Select a Type
        <select value={selectedType} onChange={handleChange} className="select-type-pokemon">
            <option value="">Select Type</option>
            {Object.values(pokemonTypes).map((pokemonType) => (
                <option key={pokemonType} value={pokemonType}>
                    {pokemonType}
                </option>
            ))}
        </select>
        </label>


        <div className="pokemon-types-container">
                {selectedType !== "" && (
                    pokemonTypeData.map((pokemon) => (
                     
                        <div key={pokemon.id} className="pokemon-types-card">
                            <div className="pokemon-types-details">
                            <h1 >{pokemon.name}</h1>

                            {typesToClass(pokemon.types).length === 1? (
                                <p className={typesToClass(pokemon.types)[0]}><span style={{color: '#D7B8F3'}}>Types: </span>{typesToClass(pokemon.types)[0]}</p>

                            ):(
                                <p className={typesToClass(pokemon.types)[0]}><span style={{color: '#D7B8F3'}}>Types: </span>{typesToClass(pokemon.types)[0]} <span className={typesToClass(pokemon.types)[1]}>{typesToClass(pokemon.types)[1]}</span></p>
                                

                            )}
                            </div>

                            <img className='pokemon-card-img' src={pokemon.front_default} alt={pokemon.name} />
                            </div>
                    
                           
                       
                   
                    ))
                )}
            </div>
        </div>
    )
}
export default PokemonTypesList