import React from "react";

const Photos = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { large },
  },
}) => {
  return (
    <>
      <div className="card my-3 mx-2 " style={{ width: "18rem" }}>
        <img src={large} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
          </p>
          <a href={portfolio_url} className="btn btn-dark">
           Portfolio
          </a>
        </div>
      </div>
    </>
  );
};

export default Photos;
