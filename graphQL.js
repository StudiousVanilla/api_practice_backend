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
      strDrink: {type:GraphQLString},
      idDrink: {type:GraphQLString},
      strAlcoholic: {type:GraphQLString},
      strGlass: {type:GraphQLString},
      strInstructions: {type:GraphQLString},
      ingredients:{
        type: GraphQLList(GraphQLString),
        description: 'A list of ingredients',
        resolve: (parent)=>{
          return[
          parent.strIngredient1,
          parent.strIngredient2,
          parent.strIngredient3,
          parent.strIngredient4,
          parent.strIngredient5,
          parent.strIngredient6,
          parent.strIngredient7,
          parent.strIngredient8,
          parent.strIngredient9,
          parent.strIngredient10, 
          parent.strIngredient11,
          parent.strIngredient12,
          parent.strIngredient13,
          parent.strIngredient14,
          parent.strIngredient15
          ]
        }
      },
      measures:{
        type: GraphQLList(GraphQLString),
        description: 'A list of measures',
        resolve: (parent)=>{
          return[
          parent.strMeasure1,
          parent.strMeasure2,
          parent.strMeasure3,
          parent.strMeasure4,
          parent.strMeasure5,
          parent.strMeasure6,
          parent.strMeasure7,
          parent.strMeasure8,
          parent.strMeasure9,
          parent.strMeasure10, 
          parent.strMeasure11,
          parent.strMeasure12,
          parent.strMeasure13,
          parent.strMeasure14,
          parent.strMeasure15
          ]
        }
      },
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