import { Ingredients } from '../shared/ingredients';
export class Recipe {
    constructor(private recipeName: string, 
                private recipeDescription: string,
                private recipeImagePath: string,
                private recipeIngredients: Ingredients[]
                ) {}
}
