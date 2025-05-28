import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokeInfo from './PokeInfo';

function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemons = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const results = res.data.results;

    const detailedData = await Promise.all(
      results.map(pokemon => axios.get(pokemon.url))
    );

    setPokemons(detailedData.map(res => res.data));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filtered = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Pokemon Dashboard</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '200px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filtered.map(pokemon => (
          <PokeInfo key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
