const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

const corsOptions = {
  origin: ["http://localhost:3001","http://localhost:3000" ,"https://hungry-goodall-28f444.netlify.app", "https://www.drinkmxr.com"]
}

app.use(cors(corsOptions))

// middleware
app.use(express.json())

// initialise routes
const LOTRRoutes = require("./routes/LOTRRoutes")
const cocktailRoutes = require("./routes/cocktailRoutes")






// LOTR ****

// use LOTR routes for base URL endpoint
app.use('/', LOTRRoutes)





// cocktails ****


// get schema for graphQL
const schema = require('./graphQL')
// use graphWL for '/graphql endpoints'
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql:true
}))


// use cocktail routes for base URL endpoint
// may not be necessary due to graphQL
app.use('/cocktail', cocktailRoutes)




// Port ****


app.listen(port, () => {
  console.log(`Example app listening at ${port}`) 
})

























// for hostorical data api thing - might n it be used for hthis project
// const fetchHISTData = async (res) =>{
//     try {
//         const json = await fetch("http://history.muffinlabs.com/date")
//         const data = await json.json();
//         res.send(data.data.Events)
 
//     } catch (error) {
//         console.log(`error is : ${error}`);
//     }
// }


// // just to stop errors when testing Heroku app
// app.get('/hist', (req, res)=>{
//     res.send('hello')
// })