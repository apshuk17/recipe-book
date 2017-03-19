import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredients } from '../../shared/ingredients'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

@Input() selectedRecipe: Recipe;

private subscription: Subscription;
private recipeIndex: number;

constructor(private recipeService: RecipeService, 
            private activatedRoute: ActivatedRoute,
            private router: Router,
            private sls: ShoppingListService) {}

onEdit() {
  this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
}

addIngredients(ingredients: Ingredients[]) {
  this.sls.addItems(ingredients);
  console.log(this.sls.getItems());
}

onDelete(selectedRecipe: Recipe) {
  this.recipeService.onDelete(selectedRecipe);
  this.router.navigate(['/recipes']);
}

 ngOnInit() {
   this.subscription = this.activatedRoute.params.subscribe(
     (param) => {
       this.recipeIndex = param['id'];
       this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
     }
   ); 
 } 

 ngOnDestroy() {
   this.subscription.unsubscribe();
 }

}
