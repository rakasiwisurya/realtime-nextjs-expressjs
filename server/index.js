require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);

mongoose.connect(process.env.MONGO_uRL);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
