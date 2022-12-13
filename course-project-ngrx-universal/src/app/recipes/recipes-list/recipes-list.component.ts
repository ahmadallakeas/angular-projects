import { outputAst } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recepies: Recipe[];
  storeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    // this.recepies = this.reciepesService.getRecipes();
    this.storeSub = this.store
      .select('recipes')
      .pipe(
        map((recipesState) => {
          return recipesState.recipes;
        })
      )
      .subscribe({
        next: (recipes: Recipe[]) => {
          this.recepies = recipes;
          console.log(recipes);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
