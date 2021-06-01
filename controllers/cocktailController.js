require('dotenv').config()
const fetch = require('node-fetch')


const fetchIngredients = async (req, res) =>{
    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
        const data = await json.json();
        const ingredients = data.drinks.map(drink=>drink.strIngredient1)
        res.send(ingredients)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

const fetchIngredientCocktails =async (req, res)=>{
    // replaces all '-' in string from url req with ',' for api fetch
    const regex = /\+/g 
    const ingredients = req.params.ingredient.replace(regex, ',')

    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=${ingredients}`)
        const data = await json.json();
        res.send(data.drinks)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

const fetchIdCocktail = async (req, res) =>{
    // gets data on one drink based off id
    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${req.params.id}`)
        const data = await json.json();

        // gets number of ingredients in drink
        const ingredientArray = Object.entries(data.drinks[0])
        const ingredients = ingredientArray.slice(17,32).filter(array=> array[1] !== null && array[1] !== "")


        // gets just info needed for menu
        const menuInfo = {
            drink: data.drinks[0].strDrink,
            numOfIngredients: ingredients.length,
            glass: data.drinks[0].strGlass,
            id: data.drinks[0].idDrink
        } 
    
        res.send(data)


    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

const fetchAlcococktails = async (req, res) =>{
    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?a=Alcoholic`)
        const data = await json.json();
        const Names = data.drinks.map(drink => drink.strDrink)
        res.send(data.drinks)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

const fetchCocktailGalsses = async (req, res) => {
    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/list.php?g=list`)
        const data = await json.json();
        const glasses = data.drinks.map(glass => glass.strGlass)
        res.send(glasses)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

module.exports = {fetchIngredientCocktails, fetchIdCocktail, fetchAlcococktails, fetchIngredients, fetchCocktailGalsses}