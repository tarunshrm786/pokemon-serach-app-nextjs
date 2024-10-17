"use client";

import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [pokemonPerPage] = useState(20); // Show 20 Pokémon per page

  // Fetch Pokémon data and types
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredPokemon(data.results);
      });

    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  // Filter Pokémon by search term and type
  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemonOfType = data.pokemon.map((p) => p.pokemon.name);
          filtered = filtered.filter((pokemon) => pokemonOfType.includes(pokemon.name));
          setFilteredPokemon(filtered);
        });
    } else {
      setFilteredPokemon(filtered);
    }
  }, [searchTerm, selectedType, pokemonList]);

  // Get current Pokémon for pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokémon Search</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mr-2"
        />

        <select
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          className="border rounded p-2 text-black"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name} className="text-black">
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Check if no Pokémon data is found */}
      {currentPokemon.length === 0 ? (
        <div className="text-center">
         
          <p className="text-xl font-bold mt-4">No Pokémon data found</p>
        </div>
      ) : (
        <>
          {/* Pokémon List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="border p-2 mx-1"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`border p-2 mx-1 ${currentPage === number + 1 ? 'bg-gray-300' : ''}`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border p-2 mx-1"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}


