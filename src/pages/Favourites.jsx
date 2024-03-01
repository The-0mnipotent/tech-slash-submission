import axios from "axios";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from the server on component mount
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites");
        response.data.isArray()
          ? setFavorites(response.data)
          : setFavorites([]);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        // Set favorites to an empty array if request fails
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      await axios.delete(`/api/favorites/${id}`);
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
      console.log(`Removed favorite with ID ${id}`);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="header">
      <h1>Favorite Universities</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Country</th>
            <th>Web Page</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite) => {
            <li key={favorite.id}>
              <strong>{favorite.name}</strong> - {favorite.country} -
              <a
                href={favorite.web_pages}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {favorite.web_pages}
              </a>
              <button onClick={() => removeFromFavorites(favorite.id)}>
                Remove
              </button>
            </li>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritesPage;
