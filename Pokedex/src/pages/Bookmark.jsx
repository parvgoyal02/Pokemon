import React, { useEffect, useState } from 'react';

function BookmarkPage() {
  const [bookmarked, setBookmarked] = useState([]);

  const loadBookmarks = () => {
    const userRaw = localStorage.getItem('loggedInUser');
    if (userRaw) {
      const loggedInUser = JSON.parse(userRaw); 
      const key = `bookmarkedPokemons_${loggedInUser.email}`;
      const raw = localStorage.getItem(key);
      const bookmarks = raw ? JSON.parse(raw) : [];
      setBookmarked(bookmarks);
    }
  };

  useEffect(() => {
    loadBookmarks();
    window.addEventListener("bookmarksUpdated", loadBookmarks);
    return () => window.removeEventListener("bookmarksUpdated", loadBookmarks);
  }, []);

  const handleRemove = (id) => {
    const userRaw = localStorage.getItem('loggedInUser');
    if (!userRaw) return;
    const loggedInUser = JSON.parse(userRaw);
    const key = `bookmarkedPokemons_${loggedInUser.email}`;
    const updated = bookmarked.filter(pokemon => pokemon.id !== id);
    setBookmarked(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarksUpdated"));
  };


  return (
    <div style={{ flex: 1, paddingLeft: '20px' }}>
      <h2>Your Bookmarked Pokemon</h2>
      {bookmarked.length === 0 ? (
        <p>No bookmarked Pokemon.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {bookmarked.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                width: '160px',
                textAlign: 'center'
              }}
            >
              <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
              <img src={pokemon.sprite} alt={pokemon.name} />
              <button
                style={{ marginTop: '10px', color: 'red' }}
                onClick={() => handleRemove(pokemon.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkPage;
