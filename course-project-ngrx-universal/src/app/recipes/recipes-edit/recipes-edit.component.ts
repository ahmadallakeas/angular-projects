import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css'],
})
export class RecipesEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  storeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.recipeForm.value.recipeIngredients);
    });
  }
  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipesState) => {
            return recipesState.recipes.find((recipe, index) => {
              return index == this.id;
            });
          })
        )
        .subscribe({
          next: (recipe) => {
            recipeName = recipe.name;
            recipeImage = recipe.imageUrl;
            recipeDescription = recipe.description;
            if (recipe.ingredients) {
              for (let ingredient of recipe.ingredients) {
                ingredients.push(
                  new FormGroup({
                    ingredientName: new FormControl(
                      ingredient.name,
                      Validators.required
                    ),
                    ingredientAmount: new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/[1-9]+[0-9]*/),
                    ]),
                  })
                );
              }
            }
          },
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      recipeIngredients: ingredients,
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }
  onSubmit() {
    const formValues = this.recipeForm.value;
    const ingredients: Ingredient[] = [];

    for (let ingredient of formValues.recipeIngredients) {
      ingredients.push(
        new Ingredient(ingredient.ingredientName, ingredient.ingredientAmount)
      );
    }
    const recipe = new Recipe(
      formValues['name'],
      formValues['description'],
      formValues['imagePath'],
      ingredients
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, recipe);
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: recipe,
        })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(recipe));
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  addIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        ingredientName: new FormControl(null, Validators.required),
        ingredientAmount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[1-9]+[0-9]*/),
        ]),
      })
    );
  }
  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(index);
  }
}
