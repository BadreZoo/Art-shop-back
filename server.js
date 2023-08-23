require('dotenv').config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require('./router/router'); // Corrected import
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'https://stellar-narwhal-6636af.netlify.app' // Remplacez par l'URL correcte de votre front-end
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.use((req, res, next) => {
  const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});


app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
