import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private id: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  onAddToShoppingList() {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
