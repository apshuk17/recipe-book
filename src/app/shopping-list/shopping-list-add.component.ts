import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredients';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredients;
  @Output() cleared = new EventEmitter();
  isAdd = true; 

  constructor(private sls: ShoppingListService) { }

  onSubmit(ingredient: Ingredients) {
    const newIngredient = new Ingredients(ingredient.ingredientName, ingredient.ingredientAmount);
    if(!this.isAdd){
      this.sls.editItems(this.item, newIngredient);
      this.onClear();
    }else{
      //Add
      this.item = newIngredient; 
      this.sls.addItem(this.item);
    }
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

  ngOnChanges(changes) {
    if(changes.item.currentValue !== null ){
      this.isAdd = false;
    }else{
      this.isAdd = true;
      this.item = {ingredientName: null, ingredientAmount: null}
    }
  }

}
