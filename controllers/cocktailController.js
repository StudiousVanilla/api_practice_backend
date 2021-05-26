require('dotenv').config()
const fetch = require('node-fetch')


const fetchCocktail = async (req, res) =>{
    try {
        const json = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
        const data = await json.json();
        res.send(data)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

module.exports = {fetchCocktail}