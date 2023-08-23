const { Client } = require("pg");

// Charger la valeur de PG_URL depuis les variables d'environnement
const client = new Client({
  connectionString: process.env.PG_URL
});

// Connecter le client
client.connect();

// Exporter le client connecté
module.exports = client;
