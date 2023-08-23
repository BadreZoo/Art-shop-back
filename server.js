require('dotenv').config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require('./router/router'); // Corrected import
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'https://stellar-narwhal-6636af.netlify.app' // Replace with the allowed origin(s) of your front-end application
}));    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.use((req, res, next) => {
  const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
