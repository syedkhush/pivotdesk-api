const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/", (req, res) => {
  res.send("PivotDesk API Running 🚀");
});

io.on("connection", (socket) => {
  console.log("Frontend connected");

  socket.emit("price", {
    symbol: "RELIANCE",
    ltp: 2450.75,
    high: 2462.30,
    low: 2432.10,
    volume: 612273
  });

  setInterval(() => {
    const price =
      2450 + (Math.random() - 0.5) * 20;

    socket.emit("price", {
      symbol: "RELIANCE",
      ltp: Number(price.toFixed(2)),
      high: 2462.30,
      low: 2432.10,
      volume: Math.floor(
        Math.random() * 1000000
      )
    });
  }, 1000);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
