

export const typeMultipliers = {
    grass: {
      doubleDamageFrom: ["flying", "poison", "bug", "fire", "ice"],
      doubleDamageTo: ["ground", "rock", "water"],
      halfDamageFrom: ["ground", "water", "grass", "electric"],
      halfDamageTo: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    },
    fire: {
      doubleDamageFrom: ["ground", "rock", "water"],
      doubleDamageTo: ["bug", "steel", "grass", "ice"],
      halfDamageFrom: ["bug", "steel", "fire", "grass", "ice", "fairy"],
      halfDamageTo: ["rock", "fire", "water", "dragon"],
    },
    water: {
      doubleDamageFrom: ["grass", "electric"],
      doubleDamageTo: ["ground", "rock", "fire"],
      halfDamageFrom: ["steel", "water", "fire", "ice"],
      halfDamageTo: ["water", "grass", "dragon"]
    },
    electric: {
      doubleDamageFrom: ["ground"],
      doubleDamageTo: ["flying", "water"],
      halfDamageFrom: ["flying", "steel", "electric"],
      halfDamageTo: ["grass", "electric", "dragon"]
    },
    psychic: {
      doubleDamageFrom: ["bug", "ghost", "dark"],
      doubleDamageTo: ["fighting", "poison"],
      halfDamageFrom: ["fighting", "psychic"],
      halfDamageTo: ["steel", "psychic"]
    },
    dark: {
      doubleDamageFrom: ["fighting", "bug", "fairy"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["ghost", "dark"],
      halfDamageTo:["fighting", "dark", "fairy"]
    },
    steel: {
      doubleDamageFrom: ["fighting", "ground", "fire"],
      doubleDamageTo: ["rock", "ice", "fairy"],
      halfDamageFrom: ["normal", "flying", "rock","bug", "steel", "grass", "psychic", "ice", "dragon", "fairy" ],
      halfDamageTo: ["steel", "water", "fire", "electric"]
    },
    dragon: {
      doubleDamageFrom: ["ice", "dragon", "fairy"],
      doubleDamageTo: ["dragon"],
      halfDamageFrom: ["fire", "water", "grass", "electric"],
      halfDamageTo: ["steel"]
    },
    fairy: {
      doubleDamageFrom: ["poison", "steel"],
      doubleDamageTo: ["fighting", "dragon", "dark"],
      halfDamageFrom: ["fighting", "bug", "dark"],
      halfDamageTo: ["poison", "steel", "fire"]
    },
    normal: {
      doubleDamageFrom: ["fighting"],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: ["rock", "steel"]
    },
    flying: {
      doubleDamageFrom: ["rock", "electric", "ice"],
      doubleDamageTo: ["fighting", "bug", "grass"],
      halfDamageFrom: ["fighting", "bug", "grass"],
      halfDamageTo: ["rock", "steel", "electric"]
    },
    poison: {
      doubleDamageFrom: ["ground", "psychic"],
      doubleDamageTo: ["grass", "fairy"],
      halfDamageFrom: ["fighting", "poison", "bug", "grass", "fairy"],
      halfDamageTo: ["poison", "ground", "rock", "ghost" ],
    },
    ground: {
      doubleDamageFrom: ["water", "grass", "ice"],
      doubleDamageTo: ["poison", "rock", "steel", "fire", "electric"],
      halfDamageFrom: ["poison", "rock"],
      halfDamageTo: ["bug", "grass"]
    },
    rock: {
      doubleDamageFrom: ["fighting", "water", "grass", "steel", "ground"],
      doubleDamageTo: ["flying", "bug", "fire", "ice"],
      halfDamageFrom: ["normal", "flying", "poison", "fire"],
      halfDamageTo: ["fighting", "ground", "steel"]
    },
    bug: {
      doubleDamageFrom: ["flying", "rock", "fire"],
      doubleDamageTo: ["grass", "psychic", "dark"],
      halfDamageFrom: ["fighting", "ground", "grass"],
      halfDamageTo: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy" ]
    },
    ghost: {
      doubleDamageFrom: ["ghost", "dark"],
      doubleDamageTo: ["ghost", "psychic"],
      halfDamageFrom: ["poison", "bug"],
      halfDamageTo: ["dark"]
    },
    ice: {
      doubleDamageFrom: ["fighting", "rock", "steel", "fire"],
      doubleDamageTo: ["flying", "ground", "grass", "dragon"],
      halfDamageFrom: ["ice"],
      halfDamageTo: ["steel", "fire", "water", "ice"]
    },
    fighting: {
      doubleDamageFrom: ["flying", "psychic", "fairy"],
      doubleDamageTo: ["normal", "rock", "steel", "ice", "dark"],
      halfDamageFrom: ["rock", "bug", "dark"],
      halfDamageTo: ["flying", "poison", "bug", "psychic", "fairy"]
    }

    // ... other types
  };