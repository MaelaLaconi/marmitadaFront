export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allRecipe: '/recipe',
      randomRecipe: '/recipe/random',
      oneRecipe: '/recipes/:id',
      allRecipeCat:'/recipes/category/:category',
    }
  }
};
