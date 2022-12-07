import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  editIndex: number;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe({
      next: (id) => {
        this.editIndex = id;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
  onSubmit() {
    const formValue = this.form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(newIngredient, this.editIndex);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clearForm()

  }
  onClear()
  {
    this.clearForm()
  }
  clearForm()
  {
    this.form.reset();
    this.editMode = false;
  }
  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editIndex)
    this.clearForm()

  }
}
