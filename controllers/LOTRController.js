require('dotenv').config()
const fetch = require('node-fetch')

const fetchQuoteData = async (req, res) =>{
    try {
        const json = await fetch("https://the-one-api.dev/v2/quote?limit=2000",
        {
            headers:{
                Authorization: 'Bearer ' + process.env.TOKEN
            }
        })
        const data = await json.json();

        // returns a random number from 1-1000
        let quoteNumber = Math.floor(Math.random() * 2000)
        // uses random number to select a quote from quote array
        const quote = data.docs[quoteNumber]
        res.send(quote)


    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

const fetchCharacterData = async (req, res) =>{
    try {
        const json = await fetch(`https://the-one-api.dev/v2/character/${req.params.id}`,
        {
            headers:{
                Authorization: 'Bearer ' + process.env.TOKEN
            }
        })
        const data = await json.json();
        const character = data.docs[0]
        res.send(character)
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}

module.exports = {fetchQuoteData, fetchCharacterData}