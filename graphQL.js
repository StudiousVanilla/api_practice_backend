require('dotenv').config()
const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull } = require('graphql')


const DrinkInfoType = new GraphQLObjectType({
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
  
const DrinkType = new GraphQLObjectType({
    name: 'Drink',
    description: 'basic drink information',
    fields: ()=>({
      strDrink:{ type: GraphQLNonNull(GraphQLString)},
      idDrink: { type: GraphQLNonNull(GraphQLString)},
      drinkInfo: {
      type: DrinkInfoType,
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
      drinks:{
        type: new GraphQLList(DrinkType),
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
      drink:{
        type: DrinkType,
        description: 'A single drink',
        args: {
          id: { type: GraphQLString}
        },
        resolve: async (parent, args) => {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${args.id}`)
  
          const data = await response.json()
          
          return data.drinks[0]
        }
      }
    })
})
  
const schema = new GraphQLSchema({
    query: RootQueryType
})
  
module.exports = schema