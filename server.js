const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./src/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const initiate_connection = async () => {
  try {
    await mongo_connection();
  } catch (e) {
    console.log('Error while initialize', e);
  }
}

const mongo_connection = async () => {
  try {
    const options = {
      // If not connected, return errors immediately rather than waiting for reconnect
      // bufferMaxEntries: 0,
      // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      // poolSize: 10, // Maintain up to 10 socket connections
      // reconnectTries: 300,
      // reconnectInterval: 1000, // Reconnect every 500ms
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // useFindAndModify: false,  // deprecation warning
    };
    const dbConnectionString = 'mongodb://localhost:27017/test-project';
    await mongoose.connect(dbConnectionString, options);
  } catch (e) {
    console.log('Error while connecting to mongo', e);
  } finally {
    console.log('Mongo Connection Successful');
    listen();
  }
}

const listen = async () => {
  try {
    await app.listen(6060);
  } catch (e) {
    console.log('Error while listening', e);
  } finally {
    console.log(`⚡️[server]: Server is running at http://localhost:${6060}`);
    initiate_controller();
  }
}

const initiate_controller = async () => {
//   routers.array.forEach((route) => {
    app.use('/', router);
//   })
}

initiate_connection();