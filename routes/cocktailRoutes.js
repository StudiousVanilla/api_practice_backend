const express = require('express');
const router = express.Router();

const cocktailController = require("../controllers/cocktailController")

router.get('/ingredient/:ingredient', cocktailController.fetchIngredientCocktails)

router.get('/drink/:id', cocktailController.fetchIdCocktail)

router.get('/type/alco', cocktailController.fetchAlcococktails)

router.get('/ingredients', cocktailController.fetchIngredients)

router.get('/glasses', cocktailController.fetchCocktailGalsses)

module.exports = router