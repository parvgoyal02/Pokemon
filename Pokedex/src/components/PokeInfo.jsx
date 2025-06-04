import React from 'react';
import { useNavigate } from 'react-router-dom';

function PokeInfo({ pokemon }) {
  const navigate = useNavigate();

  const handleBookmark = () => {
  const userRaw = localStorage.getItem('loggedInUser');
  if (!userRaw) {
    alert('Please log in to bookmark Pokémon.');
    navigate('/login');
    return;
  }
  const loggedInUser = JSON.parse(userRaw);
  const key = `bookmarkedPokemons_${loggedInUser.email}`;

  const saved = JSON.parse(localStorage.getItem(key)) || [];

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

  localStorage.setItem(key, JSON.stringify(newBookmarks));
  window.dispatchEvent(new Event("bookmarksUpdated"));
  };
  const handleViewDetails = () => {
      navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      width: '160px',
      textAlign: 'center',
      cursor: 'pointer',
    }}
    onClick={handleViewDetails}
    >
      <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark();
          }}
        >
          Bookmark
        </button>
      </div>
    </div>
  );
}

export default PokeInfo;
