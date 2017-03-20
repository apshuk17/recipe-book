import { Ingredients } from '../shared/ingredients';
export class Recipe {
    constructor(public recipeName: string, 
                public recipeDescription: string,
                public recipeImagePath: string,
                public recipeIngredients: Ingredients[]
                ) {}
}
