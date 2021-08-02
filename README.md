Built by [Oisin Byrne](https://www.oisinbyrne.me)

This backend, built with Node and Express JS, is used to send data to multiple front end projects. This is to reduce the personal costs of hosting and using a dyno on [heroku](https://id.heroku.com). This backend is only used for projects do not require a large or dedicated backend.

Current frontend projects that use this backend:
* [DrinkMXR](https://www.drinkmxr.com/) - [Repo](https://github.com/StudiousVanilla/drinkmxr)

* [LOTR Quotes](https://hungry-goodall-28f444.netlify.app/) - [Repo](https://github.com/StudiousVanilla/api_practice_frontend)

# :cocktail: DrinkMXR

Fetches data from [thecocktaildb](https://www.thecocktaildb.com/api.php) for DrinkMXR frontend

Uses graphQL to manage complex queries from frontend to [thecocktaildb](https://www.thecocktaildb.com/api.php). Express then returns JSON data to front end.

GraphQL manipulates data fetched from [thecocktaildb](https://www.thecocktaildb.com/api.php) and returns data relevant to frontend application and in a format designed to be easily accessed by the frontend.

Makes use of [thecocktaildb](https://www.thecocktaildb.com/api.php) api key for authorization to access complete dataset and all endpoints

:computer: [Live Demo](https://www.drinkmxr.com/) - [Frontend Repo](https://github.com/StudiousVanilla/drinkmxr)


# :ring: LOTR quotes

Fetches data from the [the-one-api](https://the-one-api.dev/) for LOTR quote frontend

Uses Express Routes and Controllers to manage data sent to front end. Follows simple REST api naming conventions.

Makes use of a [the-one-api](https://the-one-api.dev/) bearer token for authentication.

Fetches quote array and then selects a quote based off random number generation.

Character data is fetched using a character 'id' endpoint, taken from the quote data on the frontend.

Data is sent to the frontend in JSON format.

:computer: [Live Demo](https://hungry-goodall-28f444.netlify.app/) - [Frontend Repo](https://github.com/StudiousVanilla/api_practice_frontend)


