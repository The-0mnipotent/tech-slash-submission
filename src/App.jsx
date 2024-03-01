import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FavoritesPage from "./pages/Favourites";
import SearchPage from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
