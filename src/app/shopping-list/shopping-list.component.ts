import { Component, OnInit } from '@angular/core';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { ShoppingListService } from './shopping-list.service';
import { Ingredients } from '../shared/ingredients';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  items: Ingredients[] = [];
  selectedItem: Ingredients = null;

  constructor(private sls: ShoppingListService) { }

  onSelectItem(item: Ingredients) {
    this.selectedItem = item;
  }

  onClear() {
    this.selectedItem = null;
  }

  ngOnInit() {
    this.items = this.sls.getItems();
  }

}
