import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookmarkPage() {
  const [bookmarked, setBookmarked] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please log in to view bookmarks.');
      navigate('/login');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('bookmarkedPokemons')) || [];
    setBookmarked(saved);
  }, [navigate]);

  return (
    <div>
      <h2>Your Bookmarked Pokemon</h2>
      {bookmarked.length === 0 ? (
        <p>No bookmarked Pokemon.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {bookmarked.map(pokemon => (
            <div key={pokemon.id} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              width: '160px',
              textAlign: 'center'
            }}>
              <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkPage;
