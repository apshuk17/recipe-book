import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Rx';
import { Recipe } from '../recipe';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ingredients } from '../../shared/ingredients';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeForm: FormGroup;
  isNew: boolean = true; 
  private subscription: Subscription;
  private recipeIndex: number;
  private recipe: Recipe;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params) => {
        if(params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else{
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );  
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
    console.log(this.recipeService.getRecipe(index));
  }

  onAddItem(name: string, amount: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
            ingredientName: new FormControl(name, Validators.required),
            ingredientAmount: new FormControl(+(amount), [Validators.required, Validators.pattern('\\d+')])
      })
    );
  }

  onSubmit(){
    const newRecipe = new Recipe(this.recipeForm.value.name,
                                this.recipeForm.value.description,
                                this.recipeForm.value.imagePath,
                                this.recipeForm.value.ingredients);
    if(this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    }else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    console.log(this.recipeService.getRecipes(), this.isNew);
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  onCancel() {
    this.navigateBack();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew) {
      for(var i=0; i < this.recipe.recipeIngredients.length; i++){
        recipeIngredients.push(
          new FormGroup({
            ingredientName: new FormControl(this.recipe.recipeIngredients[i].ingredientName,
                                            Validators.required),
            ingredientAmount: new FormControl(this.recipe.recipeIngredients[i].ingredientAmount,
                                            [Validators.required, Validators.pattern('\\d+')])
          })
        );
      }
      recipeName = this.recipe.recipeName;
      recipeImageUrl = this.recipe.recipeImagePath;
      recipeContent = this.recipe.recipeDescription;
    }
    this.recipeForm = this.formBuilder.group({
        name: [recipeName, Validators.required],
        imagePath: [recipeImageUrl, Validators.required],
        description: [recipeContent, Validators.required],
        ingredients: recipeIngredients
    });
  }

}
