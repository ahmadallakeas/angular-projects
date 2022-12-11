import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

  }

  onClickIngredient(id) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  ngOnDestroy() {
  }
}
