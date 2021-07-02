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