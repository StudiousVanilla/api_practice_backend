const express = require('express');
const router = express.Router();

const cocktailController = require("../controllers/cocktailController")

router.get('/:id', cocktailController.fetchCocktail)

module.exports = router