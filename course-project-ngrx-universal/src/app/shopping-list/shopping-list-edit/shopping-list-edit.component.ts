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
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe({
      next: (state) => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          console.log(this.editedItem)
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      },
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }
  onSubmit() {
    const formValue = this.form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
        newIngredient,
        )
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.clearForm();
  }
  onClear() {
    this.clearForm();
  }
  clearForm() {
    this.form.reset();
    this.editMode = false;
  }
  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.clearForm();
  }
}
