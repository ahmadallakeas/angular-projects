import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {

  @Output() recipeClicked= new EventEmitter<Recipe>()

  recepies: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'Test Description',
      'https://www.allrecipes.com/thmb/WqWggh6NwG-r8PoeA3OfW908FUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg'
    ),
    new Recipe(
      'Recipe 2',
      'Recipe 2 Test',
      'https://www.allrecipes.com/thmb/WqWggh6NwG-r8PoeA3OfW908FUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg'
    )
  ];
  constructor() {}
  ngOnInit() {}

  onRecipeCLicked(recipe)
  {
    this.recipeClicked.emit(recipe)

  }

}
