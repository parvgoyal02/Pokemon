import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import PokeInfo from '../components/PokeInfo';

function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);  
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemons = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const results = res.data.results;

      const detailedData = await Promise.all(
        results.map(pokemon => axios.get(pokemon.url))
      );

      const newPokemons = detailedData.map(res => res.data);

      setPokemons(prev => [...prev, ...newPokemons]);
      setOffset(prev => prev + 20);
      if (!res.data.next) setHasMore(false); // ✅ stop if no next
    } catch (err) {
      console.error("Failed to load Pokémon:", err);
    }

    setLoading(false);
  }, [offset, loading, hasMore]);

  useEffect(() => {
    fetchPokemons();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        fetchPokemons();
      }
    };
  window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPokemons]);

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
      {/* ✅ Loading indicator */}
      {loading && <p>Loading more Pokémon...</p>}
      {!hasMore && <p>All Pokémon loaded!</p>}
    </div>
  );
}

export default Dashboard;
