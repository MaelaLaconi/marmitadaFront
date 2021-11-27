export type Recipe = {
  // Nom du plat
  name: string;
  // Description du plat
  description: string;
  // Auteur de la recette
  author: {
    firstname?: string,
    lastname?: string,
    pseudo: string,
  };
  // Liste des ingrédients
  ingredients: string[];
  // Liste d'étapes pour mener à bien cette recette
  steps: string[];
  // Difficulté de la recette
  difficulty: number;
  // Temps estimé pour préparer le plat en minute
  preparationTime: number;
  // Temps de cuisson en minute
  cookingTime: number;
};
