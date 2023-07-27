const express = require("express");
const router = express.Router();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    let find = games.find((e, i) => e.id === id);
    if (!find) {
      res.json({
        message: "Game not found",
      });
    }
    return res.json(find);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  let { player1, player2, player3, player4 } = req.body;
  if (!player1) {
    return res.status(404).json({
      status: 404,
      message: "Invalid player",
    });
  }
  let id = uuid();
  let newGame = {
    id,
    users: [player1, player2, player3, player4],
    rounds: [],
  };

  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    games.push(newGame);
    fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
    res.json({
      id,
      message: "Game created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { roundIndex, roundPoints } = req.body;

  if (typeof roundPoints === "string") {
    roundPoints = JSON.parse(roundPoints);
  }
  try {
    let games = JSON.parse(fs.readFileSync("./database/games-data.json"));
    let findIndex = games.findIndex((e) => e.id == id);

    if (findIndex === -1) {
      // Nếu game chưa tồn tại thì thêm mới 1 game
      games.push({ id, rounds: [roundPoints] });
      fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
      res.json({
        message: "Create new game successfully",
      });
    } else {
      // Nếu game đã tồn tại thì tiến hành cập nhật
      if (!roundIndex) {
        games[findIndex].rounds.push(roundPoints);
        fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
        res.json({
          message: "Create new round successfully",
        });
      } else {
        games[findIndex].rounds[roundIndex] = roundPoints;
        fs.writeFileSync("./database/games-data.json", JSON.stringify(games));
        res.json({
          message: `Update round at ${roundIndex + 1} successfully`,
        });
      }
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
