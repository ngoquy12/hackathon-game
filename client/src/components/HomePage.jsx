import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const navigate = useNavigate();

  const createUSer = (e) => {
    e.preventDefault();
    const newUser = {
      player1,
      player2,
      player3,
      player4,
    };
    axios
      .post("http://localhost:8080/api/v1/games", newUser)
      .then((res) => {
        console.log(res.data);
        navigate(`/game-detail/${res.data.id}`);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <>
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Score Keeper
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <section className="user-section">
          <div className="container">
            <div className="row">
              <h1>Score Keeper</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <form id="main-form" onSubmit={createUSer}>
                <div className="mb-3">
                  <label htmlFor="player1" className="form-label">
                    Player 1
                  </label>
                  <input
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="player2" className="form-label">
                    Player 2
                  </label>
                  <input
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="player3" className="form-label">
                    Player 3
                  </label>
                  <input
                    value={player3}
                    onChange={(e) => setPlayer3(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="player4" className="form-label">
                    Player 4
                  </label>
                  <input
                    value={player4}
                    onChange={(e) => setPlayer4(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Game
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
