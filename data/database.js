// 1. require le module
const { Client } = require("pg")

console.log(process.env.PG_URL)
// 2. Créer un client
const client = new Client(process.env.PG_URL);


// 3. Connecter le client
client.connect();

//  async function test() {
//     const result = await client.query('select current_database();');
//     console.log(result);

// };
// test();


// 4. Exporter le client connecté
module.exports = client;
// 1. require le module
