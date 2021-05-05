const express = require('express');
const router = express.Router();

const LOTRController = require("../controllers/LOTRController")

router.get('/quotes', LOTRController.fetchQuoteData)
router.get('/character/:id', LOTRController.fetchCharacterData)

module.exports = router