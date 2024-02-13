
const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(process.env.DB_NAME);
}

function getDB() {
  return db;
}

module.exports = { connectToDatabase, getDB };
