import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  clickedRecipe: Recipe;

  constructor(private recipesService: RecipesService,private authService:AuthService) {}
  private selectedRecipeSub: Subscription;
  ngOnInit() {


  }
  ngOnDestroy() {
  }
}
