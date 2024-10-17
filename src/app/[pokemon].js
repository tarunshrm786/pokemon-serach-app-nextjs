import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Breadcrumb from './components/Breadcrumb';

export default function PokemonDetails() {
  const router = useRouter();
  const { pokemon } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) => setPokemonDetails(data));
    }
  }, [pokemon]);

  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb pokemonName={pokemonDetails.name} />
      <h1 className="text-3xl font-bold mb-6 capitalize">{pokemonDetails.name}</h1>

      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        className="mb-4"
      />

      <h2 className="text-xl font-bold">Stats</h2>
      <ul>
        {pokemonDetails.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
