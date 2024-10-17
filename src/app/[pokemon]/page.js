"use client"; // This line makes the component a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';

const PokemonDetail = ({ params }) => {
  const { pokemon } = params; // Get the Pokémon name from the URL parameters
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (pokemon) {
        console.log(`Fetching data for Pokémon: ${pokemon}`); // Log Pokémon name

        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
          console.log('Response:', response); // Log the response object
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Data fetched:', data); // Log the fetched data
          setPokemonData(data);
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPokemonData();
  }, [pokemon]);

  // Loader Component (Pokéball spinner)
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="pokeball-loader"></div>
      </div>
    );
  }
  if (!pokemonData) return <div>Pokémon not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb path={`Home -> ${pokemonData.name}`} />
      
      {/* 3D Card Design */}
      <div className="bg-white rounded-lg shadow-lg p-4 transform transition-all hover:scale-105 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">{pokemonData.name}</h1>

        {/* Pokémon Image */}
        <div className="flex justify-center mb-4">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="rounded-lg shadow-lg w-48 h-48" />
        </div>

        {/* Types */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">Types</h2>
          <ul>
            {pokemonData.types.map((typeInfo) => (
              <li key={typeInfo.type.name} className="text-gray-700">{typeInfo.type.name}</li>
            ))}
          </ul>
        </div>

        {/* Abilities */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">Abilities</h2>
          <ul>
            {pokemonData.abilities.map((abilityInfo) => (
              <li key={abilityInfo.ability.name} className="text-gray-700">{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">Stats</h2>
          <ul>
            {pokemonData.stats.map((statInfo) => (
              <li key={statInfo.stat.name} className="text-gray-700">
                {statInfo.stat.name}: {statInfo.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Moves */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">Some Moves</h2>
          <ul>
            {pokemonData.moves.slice(0, 5).map((moveInfo) => ( // Displaying first 5 moves
              <li key={moveInfo.move.name} className="text-gray-700">{moveInfo.move.name}</li>
            ))}
          </ul>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
