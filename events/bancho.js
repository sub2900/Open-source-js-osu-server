// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const make_packet = require('../osustream/writer.js')
// This represents your players data structure.
let players = {};

// Function to handle bancho requests
const handle_bancho = (req, res) => {
  // Validate User-Agent in headers
  if (req.headers['User-Agent'] !== 'osu!') {
    return res.status(200).send(Buffer.from('nice try.'));
  }

  // Check if osu-token is in headers to determine if it's a login
  if (!req.headers['osu-token']) {
    return res.status(200).send(handle_login(req));
  }

  return res.status(200).send(Buffer.from(''));
};

// Function to handle login requests
const handle_login = (req) => {
  // Set cho-token in headers
  req.headers['cho-token'] = 'no';

  // Split body into lines
  let data = req.body.split('\n');

  // If data has less than 2 lines, return an empty buffer
  if (data.length <= 1) {
    return Buffer.from('');
  }

  // Prepare return packet
  let ret = make_packet(75, 19);

  // Process username
  let username = data[0];
  let usafe = username.replace(' ', '_').toLowerCase();

  // Check if user exists in players
  if (!(usafe in players)) {
    // Process login data and IP
    let login = data[2].split('|');
    let ip = req.headers['X-Real-IP'];

    // Retrieve user
    let p = get_user(usafe);

    // Handle errors if user retrieval fails
    if (!p) {
      console.error('Error');
      ret.push(make_packet(5, -1));
      return ret;
    }

    // Set IP for user
    p.ip = ip;

    // Initialize user stats
    if (!p.initialize_stats_from_sql()) {
      console.error('Error');
      ret.push(make_packet(5, -1));
      return ret;
    }

    // Verify password
    if (!bcrypt.compareSync(data[1], p.passhash)) {
      ret.push(make_packet(5, -1));
      return ret;
    }

    // Save user in players
    players[usafe] = p;

    ret.push(make_packet(5, -1));
    return ret;
  }

  ret.push(make_packet(5, -1));
  return ret;
};

// Export handle_bancho for use in other modules
module.exports = { handle_bancho };
