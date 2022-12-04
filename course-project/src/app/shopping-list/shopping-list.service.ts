import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<never>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('Tomato', 10),
  ];
  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit();
  }
  addIngredients(ingredients:Ingredient[])
  {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit();

  }
}
