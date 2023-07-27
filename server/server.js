const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());

const gameRouter = require("./routes/game.routes");

app.use("/api/v1/games", gameRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
