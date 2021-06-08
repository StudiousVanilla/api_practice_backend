require('dotenv').config()
const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull, 
  GraphQLInt} = require('graphql')


// gives all the information about a drink. Used when displaying a single drink
const FullDrinkType = new GraphQLObjectType({
    name: 'DrinkInfo',
    description: 'extra drink information',
    fields: ()=>({
      strAlcoholic: {type:GraphQLString},
      strGlass: {type:GraphQLString},
      strInstructions: {type:GraphQLString},
      strIngredient1: {type:GraphQLString},
      strIngredient2: {type:GraphQLString},
      strIngredient3: {type:GraphQLString},
      strIngredient4: {type:GraphQLString},
      strIngredient5: {type:GraphQLString},
      strIngredient6: {type:GraphQLString},
      strIngredient7: {type:GraphQLString},
      strIngredient8: {type:GraphQLString},
      strIngredient9: {type:GraphQLString},
      strIngredient10: {type:GraphQLString},
      strIngredient11: {type:GraphQLString},
      strIngredient12: {type:GraphQLString},
      strIngredient13: {type:GraphQLString},
      strIngredient14: {type:GraphQLString},
      strIngredient15: {type:GraphQLString},
      strMeasure1: {type:GraphQLString},
      strMeasure2: {type:GraphQLString},
      strMeasure3: {type:GraphQLString},
      strMeasure4: {type:GraphQLString},
      strMeasure5: {type:GraphQLString},
      strMeasure6: {type:GraphQLString},
      strMeasure7: {type:GraphQLString},
      strMeasure8: {type:GraphQLString},
      strMeasure9: {type:GraphQLString},
      strMeasure10: {type:GraphQLString},
      strMeasure11: {type:GraphQLString},
      strMeasure12: {type:GraphQLString},
      strMeasure13: {type:GraphQLString},
      strMeasure14: {type:GraphQLString},
      strMeasure15: {type:GraphQLString},
    })
})

// gives basic information about a drink. Used when displaying list off drinks
const BasicDrinkInfo = new GraphQLObjectType({
  name: 'numIngredients',
  description: 'extra drink information',
  fields: ()=>({
    strAlcoholic: {type:GraphQLString},
    strGlass: {type:GraphQLString},
    numIngredients: {type:GraphQLString,
      resolve:(parent)=>{

        const values = Object.values(parent).slice(17,32).filter(value => (value === null)).length

        const numIngredients = 15 - values
    
        return numIngredients


      }
    }
  })
})

// gives basic drink information based on an id
const BasicDrinkType = new GraphQLObjectType({
    name: 'Drink',
    description: 'basic drink information',
    fields: ()=>({
      strDrink:{ type: GraphQLNonNull(GraphQLString)},
      idDrink: { type: GraphQLNonNull(GraphQLString)},
      drinkInfo: {
      type: BasicDrinkInfo,
      resolve: async (drink) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${drink.idDrink}`)
  
        const data = await response.json()
        
        return data.drinks[0]
      }
    },
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: ()=> ({
      // used when getting a list of drinks and their basic info
      drinks:{
        type: new GraphQLList(BasicDrinkType),
        description: 'List of drinks',
        args: {
          ingredients: { type: GraphQLString}
        },
        resolve: async (parent, args) => {
  
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=${args.ingredients}`)
          const data = await response.json()
          return data.drinks
        }
      },
      // used when getting a single drink and all its info
      drink:{
        type: FullDrinkType,
        description: 'A single drink',
        args: {
          id: { type: GraphQLString}
        },
        resolve: async (parent, args) => {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${args.id}`)
  
          const data = await response.json()
          
          return data.drinks[0]
        }
      },
    })
})
  
const schema = new GraphQLSchema({
    query: RootQueryType
})
  
module.exports = schema