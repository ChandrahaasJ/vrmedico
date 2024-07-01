const express = require('express');
const Model = require('./model');
const { Mongoose } = require('mongoose');
// const fetch = require('node-fetch');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB
const mongo_server = mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.route('/').get((req, res) => {
  res.send("HI");
});

router.route('/test').get((req, res) => {
  const db = mongo_server.db('test');
  let collections = db.listCollections().toArray();
  res.json({ ans: collections });
});

router.route('/storeids').post(async (req, res) => {
  let { name, userName, password, age } = req.body;
  const ifExsist = Model.findOne({username: userName});
  if(ifExsist){
    cono
  }
  try {
    const response = await fetch('http://localhost:1010/checkuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, userName, password, age }),
    });

    const responseData = await response.json();
    console.log("FLAG 1");

    if (responseData.exists) {
      res.send("User ID exists, try with a different username");
    } else {
      await Model.create({ name, userName, password, age });
      res.send("Created successfully");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.route('/checkuser').post(async (req, res) => {
  console.log("Hello world");
  const { userName } = req.body;
  try {
    const db = (await mongo_server).connection.db;
    const user = await db.collection('users').findOne({ userName: userName });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
