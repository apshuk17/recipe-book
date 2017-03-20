import { Recipe } from './recipe';
import { Ingredients } from '../shared/ingredients';

export class RecipeService {
   
    private recipes: Recipe[] = [new Recipe('Butter Chicken', 'Very Tasty', '../../assets/imgs/butter-chicken.jpg',
                     [new Ingredients('Chicken', '500'), new Ingredients('Spices', '350'), new Ingredients('Butter', '750')]),
                    new Recipe('Hyderabadi Biryani', 'Awesome Tasty', '../../assets/imgs/Hyderabadi-Biryani.jpg',
                    [new Ingredients('Chicken', '500'), new Ingredients('Rice', '350'), new Ingredients('Spices', '750')])];

    
    getRecipes() {
        return this.recipes;
    }

    getRecipe(recipeIndex: number): Recipe {
        return this.recipes[recipeIndex];
    }

    onEdit() {}

    onDelete(recipe: Recipe) {
        this.recipes.splice(this.recipes.indexOf(recipe), 1);
    } 

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
        this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    }
}