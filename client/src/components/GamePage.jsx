import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [ponitPlayer1, setPointPlayer1] = useState(0);
  const [ponitPlayer2, setPointPlayer2] = useState(0);
  const [ponitPlayer3, setPointPlayer3] = useState(0);
  const [ponitPlayer4, setPointPlayer4] = useState(0);

  // Inside the LoadUser function
  const LoadUser = () => {
    axios
      .get(`http://localhost:8080/api/v1/games/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
        setRounds(res.data.rounds);

        // Calculate the total points for each player using reduce
        const pointsArr = res.data.users.map((_, index) =>
          res.data.rounds.reduce((acc, round) => acc + round[index], 0)
        );

        // Update the state with the calculated points
        setPointPlayer1(pointsArr[0]);
        setPointPlayer2(pointsArr[1]);
        setPointPlayer3(pointsArr[2]);
        setPointPlayer4(pointsArr[3]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    LoadUser();
  }, []);

  const calculateTotalPoints = (newRounds) => {
    return newRounds[0].map((_, playerIndex) =>
      newRounds.reduce((total, round) => total + round[playerIndex], 0)
    );
  };

  const handleChange = (e, playerIndex, roundIndex) => {
    const { value } = e.target;

    // Copy điểm của từng vòng
    const newRounds = [...rounds];

    //Cập nhật lại điểm của vòng đó
    newRounds[roundIndex][playerIndex] = parseInt(value);

    // Lưu lại điểm của vòng đó
    setRounds(newRounds);

    // Tính tổng điểm
    const pointsArr = calculateTotalPoints(newRounds);

    setPointPlayer1(pointsArr[0]);
    setPointPlayer2(pointsArr[1]);
    setPointPlayer3(pointsArr[2]);
    setPointPlayer4(pointsArr[3]);

    // Prepare the data to send to the server
    const roundPoints = newRounds[roundIndex];
    const dataToUpdate = {
      roundIndex,
      roundPoints,
    };

    // Gửi dữ liệu đến server để cập nhật lại điểm
    axios
      .put(`http://localhost:8080/api/v1/games/${id}`, dataToUpdate)
      .then((res) => {
        console.log(res.data); // You can handle the response if needed
      })
      .catch((err) => {
        console.log(err); // Handle errors appropriately
      });
  };

  // Thêm mới round
  const createRound = () => {
    // Prepare the data to send to the server
    const roundPoints = [0, 0, 0, 0];
    const dataToUpdate = {
      roundPoints,
    };

    // Gửi data đến server để thêm mới một round
    axios
      .put(`http://localhost:8080/api/v1/games/${id}`, dataToUpdate)
      .then((res) => {
        // Update the rounds state with the new round data
        setRounds([...rounds, roundPoints]);

        // Calculate the total points for each player using reduce
        const pointsArr = users.map((_, index) =>
          [...rounds, roundPoints].reduce((acc, round) => acc + round[index], 0)
        );

        // Update the state with the calculated points
        setPointPlayer1(pointsArr[0]);
        setPointPlayer2(pointsArr[1]);
        setPointPlayer3(pointsArr[2]);
        setPointPlayer4(pointsArr[3]);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      {/* Navbar */}
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

      {/* Section */}
      <section className="user-section">
        <div className="container">
          <div className="row">
            <h1>Score Keeper</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr id="player-container">
                  <th scope="col">#</th>
                  {users?.map((user) => (
                    <th scope="col">{user}</th>
                  ))}
                </tr>
                <tr className="table-primary">
                  <th scope="row">
                    Sum of score (<span id="sum-of-score">0</span>)
                  </th>
                  <td>{ponitPlayer1}</td>
                  <td>{ponitPlayer2}</td>
                  <td>{ponitPlayer3}</td>
                  <td>{ponitPlayer4}</td>
                </tr>
              </thead>
              <tbody id="tbody">
                {rounds.map((round, roundIndex) => (
                  <tr key={roundIndex}>
                    <th scope="row">{roundIndex + 1}</th>
                    {round.map((score, playerIndex) => (
                      <td key={playerIndex}>
                        <input
                          className="form-control"
                          type="number"
                          value={score}
                          onChange={(e) =>
                            handleChange(e, playerIndex, roundIndex)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container">
          <button onClick={createRound} className="btn btn-primary btn-add">
            Add round
          </button>
        </div>
      </section>
    </>
  );
}
