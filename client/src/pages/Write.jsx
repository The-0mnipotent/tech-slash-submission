import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [desc, setDesc] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");

  const [cat, setCat] = useState(state?.cat || "");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);



  const navigate = useNavigate()


  const handleSearch = async (event) => {
    event.preventDefault();

    search();
  };

  async function search(){
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${searchTerm}`
      );
      setSearchResults(response.data);


    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: desc,
            cat,

          })
        : await axios.post(`/posts/`, {
            title,
            desc: desc,
            cat,

            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={desc}
            onChange={setDesc}
          />
        </div>
      </div>
      <div className="menu">
      <div className="item">
      <h1> Tag Related University</h1>        
         <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search University.."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
          </form>
       <div className="results">
          {
            searchResults.map((university, index)=>(
              <div className="cat">
                <input type="radio" 
                checked = {cat === `${university.name},${university.country}`} 
                name="cat" 
                value={`${university.name},${university.country}`}
                id = {`${university.name},${university.country}`}
                onChange={(e) => setCat(e.target.value)} 
                />
                <label htmlFor={`${university.name},${university.country}`}>{`${university.name},${university.country}`}</label>
              </div>
            ))
          }
          </div>

        </div>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Write;