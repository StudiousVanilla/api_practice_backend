const express = require('express');
const router = express.Router();

const cocktailController = require("../controllers/cocktailController")

router.get('/', cocktailController.fetchCocktail)

module.exports = router