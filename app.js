// TODO: Clean up 'cocktail routes and controllers fiules as they are not neccessary due to graphQL

const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

const corsOptions = {
  origin: ["https://hungry-goodall-28f444.netlify.app", "https://www.drinkmxr.com"]
}

app.use(cors(corsOptions))

// middleware
app.use(express.json())

// initialise routes
const LOTRRoutes = require("./routes/LOTRRoutes")

// just for development practice, actual DrinkMXR application uses '/graphQL' endpoint to fetch data from cocktailDB and then returns data to front end
const cocktailRoutes = require("./routes/cocktailRoutes")

// use cocktail routes for base URL endpoint
// again just for development practice, not actually necessary due to graphQL endpoint
app.use('/cocktail', cocktailRoutes)



// LOTR ****

// use LOTR routes for base URL endpoint
app.use('/', LOTRRoutes)



// cocktails ****

// get schema for graphQL
const schema = require('./graphQL')
// use graphQL for '/graphql endpoints'
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql:true
}))





// Port ****
app.listen(port, () => {
  console.log(`Example app listening at ${port}`) 
})