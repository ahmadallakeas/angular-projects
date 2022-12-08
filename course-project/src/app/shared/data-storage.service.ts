import { HttpClient } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}
  private url =
    'https://recipe-app-63fc6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  saveRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http.put(this.url, recipes).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipes) => {
        console.log(recipes);
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        console.log(recipes);
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
