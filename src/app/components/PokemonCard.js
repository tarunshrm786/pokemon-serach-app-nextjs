import Link from 'next/link';
import { useEffect, useState } from 'react';

const PokemonCard = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/')[6]; // Extract ID from the API URL
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Construct the image URL based on the Pokémon ID
    const constructedImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    setImageUrl(constructedImageUrl);
  }, [pokemonId]);

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent looping of error handling
    e.target.src = 'https://via.placeholder.com/150'; // Fallback image URL
  };

  return (
    <Link href={`/${pokemon.name}`}>
      <div className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        {/* Wrap the entire card in Link to make it clickable */}
        <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
        <div className="flex justify-center mb-2">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-48 h-48 rounded-lg shadow-lg"
            onError={handleImageError} // Add error handling for images
          />
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
