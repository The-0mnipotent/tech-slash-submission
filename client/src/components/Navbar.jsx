import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextDisable,setNextDisable] = useState(false);
  const [prevDisable,setPrevDisable] = useState(true);
  const [offset,setOffset] = useState(0);
  const [limit, setLimit] = useState(3);

  const navigate = useNavigate();

  // useEffect(()=>{
  //   navigate(`/?cat=${document.getElementById("university").value}`)
  //   console.log(document.getElementById("university").value);
  // },[document.getElementById("university").value])

  const handleSearch = async(event) =>{
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${searchTerm}`
      );
      setSearchResults(response.data);
      console.log(response.data);
      console.log(response.data.length);
      console.log(offset);
      console.log(offset >= 0);
      if(response.data.length<limit){
        setOffset(0);
        setNextDisable(true);
      }
      if(offset >= 0){
        setPrevDisable(false);
      }else{
        setPrevDisable(true)
        setNextDisable(false)
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Filter by University"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
          </form>
          <select name="university" id="university" onChange={()=>{
            navigate(`/?cat=${document.getElementById("university").value}`)
          }}>
            <option value="" selected>All</option>
            {searchResults.map((university, index)=>(
            <option value={`${university.name},${university.country}`} key={index}>{`${university.name},${university.country}`}</option>
          ))}
          </select>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;