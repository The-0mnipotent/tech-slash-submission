import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const addToFavorites = (university) => {
    // Add the selected university to favorites
    const updatedFavorites = [...favorites, university];
    setFavorites(updatedFavorites);

    // Save favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>University Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter university name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Web Page</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((university) => (
            <tr key={university.name}>
              <td>{university.name}</td>
              <td>{university.country}</td>
              <td>
                <a
                  href={university.web_pages}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {university.web_pages}
                </a>
              </td>
              <td>
                <button onClick={() => addToFavorites(university)}>
                  Add to Favorites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/favorites">View Favorites</Link>
    </div>
  );
}

export default SearchPage;
