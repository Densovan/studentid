require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const { MongoURI } = process.env;

const connectDatabase = async () => {
  await mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`Database Connected with successfully.`);
};

module.exports = connectDatabase;
