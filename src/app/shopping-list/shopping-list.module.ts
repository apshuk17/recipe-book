import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListAddComponent,    
    ],
    imports: [FormsModule, CommonModule]
})
export class ShoppingListModule {}