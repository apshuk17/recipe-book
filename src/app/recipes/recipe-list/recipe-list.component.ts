import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item';
import { Recipe } from '../recipe';
import { Ingredients } from '../../shared/ingredients';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

constructor(private recipeService: RecipeService) {}
recipes: Recipe[];


ngOnInit() {
  this.recipes = this.recipeService.getRecipes();
}
}

