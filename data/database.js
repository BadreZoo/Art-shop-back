const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL
});


client.connect().catch(error => {
  console.error("Error connecting to PostgreSQL:", error);
});


module.exports = client;
