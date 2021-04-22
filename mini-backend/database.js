const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/database.config.js');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async err => {
  const collection = client.db("Ancient").collection("Users");
  console.log(await collection.findOne());
  console.log(err);
  client.close();
});
