import React from 'react';
import { useNavigate } from 'react-router-dom';

function PokeInfo({ pokemon }) {
  const navigate = useNavigate();

  const handleBookmark = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert('Please log in to bookmark Pokémon.');
    navigate('/login');
    return;
  }

  const saved = JSON.parse(localStorage.getItem('bookmarkedPokemons')) || [];

  const alreadyBookmarked = saved.some(p => p.id === pokemon.id);
  if (alreadyBookmarked) {
    alert('Already bookmarked!');
    return;
  }

  const newBookmarks = [...saved, {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default
  }];

  localStorage.setItem('bookmarkedPokemons', JSON.stringify(newBookmarks));
  alert(`${pokemon.name} bookmarked!`);
};

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      width: '160px',
      textAlign: 'center'
    }}>
      <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <button onClick={handleBookmark} style={{ marginTop: '10px' }}>
        Bookmark
      </button>
    </div>
  );
}

export default PokeInfo;
