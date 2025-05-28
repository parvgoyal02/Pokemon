import React from 'react';
import { useNavigate } from 'react-router-dom';

function PokeInfo({ pokemon }) {
  const navigate = useNavigate();

  const handleBookmark = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please sign up or log in to bookmark Pokémon.');
      navigate('/signup');
      return;
    }

    alert(`${pokemon.name} bookmarked!`);
    // You can save to localStorage or IndexedDB here
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
