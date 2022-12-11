import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  recipe: Recipe;
  @Input() index: number;
  constructor(private recipesService: RecipesService) {}
  ngOnInit() {
    this.recipe = this.recipesService.getRecipe(this.index);
  }

}
