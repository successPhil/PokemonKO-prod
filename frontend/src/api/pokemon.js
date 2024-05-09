import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon {
    pokemons {
      id
      name
      types
      front_default
      back_default
    }
  }
`;
export const GET_SHINY = gql`
  query GetShinyPokes {
    pokemons {
      id
      name
      types
      front_shiny
      back_shiny
    }
  }
`;

export const GET_POKEMON_BY_TYPE = gql`
  query GetPokesByType($type: String!) {
    pokemonByType(type: $type) {
        id
        name
        types
        front_default
        back_default
    }
  }
`;

export const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves {
    moves {
        id
        name
        type
        damage
    }
  }
`;