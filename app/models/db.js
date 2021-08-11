"use strict";

var mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  debug: false,
});

module.exports = pool;
