const path = require('path');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const pgPool = require('./../pgPool');
const socketController = require('./../socketController.js');

let generateAuthToken = (userID) => {
  var access = 'auth';
  var token = jwt.sign({id: userID, access}, process.env.JWT_SECRET).toString();
  return token;
}

var verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;

  } catch (e) {
    return false;
  }
}

var authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!verifyToken(token)) {
      throw null;
    }

    next();
  } catch (e) {
    return res.redirect('/admin/login');  
  }
}

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/login.html'));
});

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    
    // GR8 PLAINTEXT SECURITY
    let dbrows;
    try {
      dbrows = await pgPool.query('SELECT * FROM Users where username = $1 AND password = $2', [user, password]);
      dbrows = dbrows.rows;
    } catch (e) {
      console.log(e)
    }

    if (dbrows.length !== 1) {
      return res.sendFile(path.join(__dirname + '/../../public/login.html'));
    }

    const token = generateAuthToken('admin');
    return res.cookie('jwtToken', token, { maxAge: 9000000, httpOnly: true })
      .redirect('/admin/dashboard');
});

router.get('/dashboard', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/admin.html'));
});

router.get('/logout', (req, res) => {
  return res.cookie('jwtToken', '', { maxAge: 900000, httpOnly: true })
    .redirect('/admin/login');
});

router.post('/newgame', (req, res) => {
  socketController.newGame();
  return res.status(200).send();
});

router.post('/nextquestion', (req, res) => {
  socketController.nextQuestion();
  return res.status(200).send();
});

module.exports = router;
