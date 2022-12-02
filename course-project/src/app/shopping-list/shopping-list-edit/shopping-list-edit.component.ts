import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('numberInput', {static: true}) numberInputRef: ElementRef;

  @Output()  ingredientAdded= new EventEmitter<Ingredient>()

  onAddClick()
  {
    const newIngredient= new Ingredient(this.nameInputRef.nativeElement.value,this.numberInputRef.nativeElement.value)
    this.ingredientAdded.emit(newIngredient)
  }

}
