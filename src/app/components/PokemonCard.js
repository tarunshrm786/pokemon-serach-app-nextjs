// import Link from 'next/link';

// const PokemonCard = ({ pokemon }) => {
//   const pokemonId = pokemon.url.split('/')[6]; // Extract ID from the API URL

//   console.log('Pokemon ID:', pokemonId); // Log the Pokémon ID
// //   const imageUrl = `https://pokeapi.co/media/sprites/pokemon/${pokemonId}.png`;
// const imageUrl = `https://pokeapi.co/media/sprites/pokemon/${pokemonId}.png`;
  
//   console.log('Image URL:', imageUrl); // Log the constructed image URL

//   return (
//     <div className="border rounded-lg p-4">
//       <Link href={`/${pokemonId}`}>
//         <h2 className="text-xl font-bold">{pokemon.name}</h2>
//       </Link>
//       <img 
//        src={imageUrl} 
//       alt={pokemon.name} />
//     </div>
//   );
// };

// export default PokemonCard;


// import Link from 'next/link';

// const PokemonCard = ({ pokemon }) => {
//   const pokemonId = pokemon.url.split('/')[6]; // Extract ID from the API URL

//   console.log('Pokemon ID:', pokemonId); // Log the Pokémon ID
//   const imageUrl = `https://pokeapi.co/media/sprites/pokemon/${pokemonId}.png`; // Construct the image URL
  
//   console.log('Image URL:', imageUrl); // Log the constructed image URL

//   return (
//     <div className="border rounded-lg p-4 shadow-md">
//       <Link href={`/${pokemonId}`}>
//         <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2> {/* Capitalize Pokémon name */}
//       </Link>
//       <img 
//         src={imageUrl} 
//         alt={pokemon.name} 
//         className="w-full h-auto mb-2" // Add styling for image
//         onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} // Fallback image
//       />
//     </div>
//   );
// };

// export default PokemonCard;

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const PokemonCard = ({ pokemon }) => {
//   const pokemonId = pokemon.url.split('/')[6]; // Extract ID from the API URL
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     // Construct the image URL based on the Pokémon ID
//     const constructedImageUrl = `https://pokeapi.co/media/sprites/pokemon/${pokemonId}.png`;
//     setImageUrl(constructedImageUrl);
//   }, [pokemonId]);

//   const handleImageError = (e) => {
//     e.target.onerror = null; // Prevent looping of error handling
//     e.target.src = 'https://via.placeholder.com/150'; // Fallback image URL
//   };

//   return (
//     <div className="border rounded-lg p-4 shadow-md">
//       <Link href={`/${pokemon.name}`}>
//         <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
//       </Link>
//       <div className="flex justify-center mb-2">
//         <img
//           src={imageUrl}
//           alt={pokemon.name}
//           className="w-48 h-48 rounded-lg shadow-lg"
//           onError={handleImageError} // Add error handling for images
//         />
//       </div>
//     </div>
//   );
// };

// export default PokemonCard;

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PokemonCard = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/')[6]; // Extract ID from the API URL
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Construct the image URL based on the Pokémon ID
    const constructedImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    console.log('Constructed Image URL:', constructedImageUrl); // Log the image URL
    setImageUrl(constructedImageUrl);
  }, [pokemonId]);

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent looping of error handling
    e.target.src = 'https://via.placeholder.com/150'; // Fallback image URL
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link href={`/${pokemon.name}`}>
        <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
      </Link>
      <div className="flex justify-center mb-2">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-48 h-48 rounded-lg shadow-lg"
          onError={handleImageError} // Add error handling for images
        />
      </div>
    </div>
  );
};

export default PokemonCard;
