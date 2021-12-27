import React, { useState, useEffect } from "react";
import Photos from "./Photos";

const mainUrl = "https://api.unsplash.com/photos/";
const accessKey = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const searchUrl = "https://api.unsplash.com/search/photos/";

function App() {
  debugger;
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const urlPage = `&page=${page}`;
  const urlQuery = `&query=${query}`;

  const fetchImages = async () => {
    let url;
    if (query) {
      url = `${searchUrl}${accessKey}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${accessKey}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages((oldimages) => {
        if(query && page==1){
          return data.results;
        }
        else if (query) {
          return [...oldimages, ...data.results];
        } else {
          return [...oldimages, ...data];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage((oldpage) => {
          return oldpage + 1;
        });
      }
      return () => {
        window.removeEventListener("scroll", event);
      };
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     setPage(1);
  };

  return (
    <>
      <div>
        <div className="container my-3">
          <h1 className="text-center">Random Photo Generator</h1>
          <div className="container col-md-4 ">
            <div className="input-group rounded ">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
          <div className="row my-3">
            {images.map((image, index) => {
              return <Photos key={index} {...image} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
