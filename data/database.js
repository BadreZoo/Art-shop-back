const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Cela peut être nécessaire en fonction de la configuration de Railway
  }
});

client.connect().catch(error => {
  console.error("Error connecting to PostgreSQL:", error);
});

module.exports = client;
