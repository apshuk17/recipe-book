import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from './recipe-list';
import { RecipeDetailComponent } from './recipe-detail';
import { Recipe } from './recipe';

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

selectedRecipe: Recipe;
onSelected(recipe: Recipe) {
  this.selectedRecipe = recipe;
}
}
