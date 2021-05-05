const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
;

// middleware
app.use(express.json())
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    res.setHeader('set-cookie', 'samesite=None; secure');

    // Pass to next layer of middleware
    next();
});

// initialise routes
const LOTRRoutes = require("./routes/LOTRRoutes")

// use LOTR routes for base URL endpoint
app.use('/', LOTRRoutes)



// const fetchLOTRQuotes = async (res) =>{
//     try {
//         const json = await fetch("https://the-one-api.dev/v2/quote?limit=2000",
//         {
//             headers:{
//                 Authorization: 'Bearer ' + process.env.TOKEN
//             }
//         })
//         const data = await json.json();

//         // returns a random number from 1-1000
//         let quoteNumber = Math.floor(Math.random() * 2000)
//         // uses random number to select a quote from quote array
//         const quote = data.docs[quoteNumber]
//         res.send(quote)


//     } catch (error) {
//         console.log(`error is : ${error}`);
//     }
// }

// const fetchCharacterData = async (res, id) =>{
//     try {
//         const json = await fetch(`https://the-one-api.dev/v2/character/${id}`,
//         {
//             headers:{
//                 Authorization: 'Bearer ' + process.env.TOKEN
//             }
//         })
//         const data = await json.json();
//         const character = data.docs[0]
//         res.send(character)
//     } catch (error) {
//         console.log(`error is : ${error}`);
//     }
// }

// // just to stop errors when testing Heroku app
// app.get('/quotes', (req, res)=>{
//     fetchLOTRQuotes(res)
// })

// // just to stop errors when testing Heroku app
// app.get('/character/:id', (req, res)=>{
//     fetchCharacterData(res, req.params.id)
// })


app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
    
})



// for hostorical dadt api thing - might n it be used for hthis project
const fetchHISTData = async (res) =>{
    try {
        const json = await fetch("http://history.muffinlabs.com/date")
        const data = await json.json();
        res.send(data.data.Events)
 
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}


// just to stop errors when testing Heroku app
app.get('/hist', (req, res)=>{
    fetchHISTData(res)
})