import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://recipe-app-63fc6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  );

  saveRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.SAVE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
          return this.http.put(
            'https://recipe-app-63fc6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipeState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
