import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const addToFavorites = async (university) => {
    try {
      await axios.post("/api/favorites", university); // Send a POST request to the server
      console.log(`Added ${university.name} to favorites`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="header">
      <h1>University Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter university name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>

        <Link className="fav-link" to="/favorites">
          <button>See Favorites</button>
        </Link>
      </form>

      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Country</th>
            <th>Web Page</th>
            <th>Add to favorites</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((university, index) => (
            <tr key={university.name}>
              <td>{index + 1}</td>
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
    </div>
  );
}

export default SearchPage;
