import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientsChangedSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.getIngredients();
    this.ingredientsChangedSub =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredient: Ingredient[]) => {
          this.ingredients = ingredient;
        }
      );
  }
  onClickIngredient(id)
  {
    this.shoppingListService.startedEditing.next(id)
  }
  getIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  ngOnDestroy() {
    this.ingredientsChangedSub.unsubscribe();
  }
}
