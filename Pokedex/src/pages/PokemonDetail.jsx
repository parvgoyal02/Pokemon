import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => setPokemon(res.data))
      .catch(() => navigate('/'));

    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedPokemons")) || [];
    setBookmarked(bookmarks.includes(name));
  }, [name, navigate]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedPokemons")) || [];
    let updatedBookmarks;

    if (bookmarked) {
      updatedBookmarks = bookmarks.filter((poke) => poke !== name);
    } else {
      updatedBookmarks = [...bookmarks, name];
    }

    localStorage.setItem("bookmarkedPokemons", JSON.stringify(updatedBookmarks));
    setBookmarked(!bookmarked);
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>⬅ Back to Dashboard</button>

      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>

      <button onClick={toggleBookmark} style={{ marginTop: '15px' }}>
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
}

export default PokemonDetail;
