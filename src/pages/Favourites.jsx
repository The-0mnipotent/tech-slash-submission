import React, { useEffect, useState } from "react";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorite Universities</h1>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <strong>{favorite.name}</strong> - {favorite.country} -
            <a
              href={favorite.web_pages}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {favorite.web_pages}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
