import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  clickedRecipe: Recipe;

  constructor(private recipesService: RecipesService) {}
  private selectedRecipeSub: Subscription;
  ngOnInit() {
    // this.selectedRecipeSub = this.recipesService.selectedRecipe.subscribe(
    //   (recipe: Recipe) => (this.clickedRecipe = recipe)
    // );
  }
  ngOnDestroy() {
  //  this.selectedRecipeSub.unsubscribe();
  }
}
