import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('numberInput', { static: true }) numberInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddClick() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.numberInputRef.nativeElement.value
    );
    this.shoppingListService.addIngredient(newIngredient);
  }
}
