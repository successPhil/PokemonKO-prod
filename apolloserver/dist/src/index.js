import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from 'fs';
const pokemonData = JSON.parse(fs.readFileSync('./pokemon.json', 'utf-8'));
const movesData = JSON.parse(fs.readFileSync('./pokemonMoves.json', 'utf-8'));
const typeDefs = `
    type Pokemon {
        id: Int!
        name: String!
        types: String!
        front_default: String!
        back_default: String!
        front_shiny: String!
        back_shiny: String!
    }

    type PokemonMove {
        id: Int!
        name: String!
        type: String!
        damage: Int!
    }

    type Query {
        pokemons: [Pokemon!]!
        shiny: [Pokemon!]!
        pokemonByType(type: String!): [Pokemon!]!
        moves: [PokemonMove!]!
    }
`;
const resolvers = {
    Query: {
        pokemons: () => pokemonData.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            front_default: pokemon.front_default,
            back_default: pokemon.back_default,
            front_shiny: pokemon.front_shiny,
            back_shiny: pokemon.back_shiny
        })),
        pokemonByType: (_, { type }) => {
            return pokemonData.filter((pokemon) => {
                try {
                    const pokemonTypes = pokemon.types.split('-');
                    return pokemonTypes.some((t) => t === type);
                }
                catch (error) {
                    console.log("only one type");
                    return type === pokemon.types;
                }
            });
        },
        moves: () => movesData.map((move) => ({
            id: move.id,
            name: move.name,
            type: move.type,
            damage: move.damage
        }))
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log("server running on " + url);
