
const BaseEvent = require('../../utils/structures/BaseEvent');
const mysql = require('mysql');
var fs = require('fs');
const path = require('path');
const {Discord, MessageEmbed } = require('discord.js');
const pool = mysql.createPool({
  multipleStatements:true,
  host : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database : process.env.DB_NAME,
});

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }

  async run(client) {

    const UPDATE_TIME = 1000 * 60 * 60; 
    var sql = "SELECT SUM(money + bank) as econTotal FROM users";
    var sql2 = "SELECT COUNT(DISTINCT identifier) as playersTotal FROM users";
    var sql3 = "SELECT SUM(amount) as speedingTotal FROM billing WHERE label LIKE 'fine: speeding%'";
    var sql4 = "SELECT SUM(amount) as fineTotal FROM billing WHERE label LIKE 'fine%'";
    var sql5 = "SELECT * from donors WHERE donor_tier='5'";
    var sql6 = "SELECT SUM(amount) as speedingTotal FROM billing WHERE label LIKE 'fine: minor speeding%'";
    var sql7 = "SELECT COUNT(owner) as housesTotal FROM allhousing";
    var sql8 = "SELECT COUNT(owner) as vehiclesTotal FROM owned_vehicles";
    var sql9 = "SELECT COUNT(DISTINCT lastname) as citizensTotal FROM users";
    var sql10 = "SELECT SUM(price) as totalHousing FROM allhousing";
    var sql11 = "SELECT COUNT(identifier) as citationTotal FROM billing WHERE label LIKE 'Fine%'";
    const filePath = process.env.filePath;
    const updateJson = async function() {
     
    pool.query(sql, function(err, results) {
      if(err) throw err;
      
      fs.writeFile(`${filePath}/econ.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql2, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/players.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql3, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/minorspeed.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql4, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/fines.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql5, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/donors.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql6, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/majorspeed.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql7, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/houses.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql8, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/vehicles.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql9, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/citizens.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql10, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/housing.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    pool.query(sql11, function(err, results) {
      if(err) throw err;
      fs.writeFile(`${filePath}/citations.json`, JSON.stringify(results), function (err) {
        if (err) throw err;
      });
    });
    fs.copyFile('../../../../../../../../../Users/JoeSw/Desktop/FXServer/txData/default/data/playersDB.json', `${filePath}/playersDB.json`, (err) => {
      if (err) throw err;
    } )
    console.log("Saved loading screen data!");
    }
    updateJson();
    client.setInterval(updateJson, UPDATE_TIME);
  }
}