import { HttpClient, HttpParams } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
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
      map((recipes) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      tap((recipes) => {
        console.log(recipes);
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
