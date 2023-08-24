const { Client } = require("pg");

// Charger la valeur de DATABASE_URL depuis les variables d'environnement
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Connecter le client
client.connect().catch(error => {
  console.error("Error connecting to PostgreSQL:", error);
});


module.exports = client;
