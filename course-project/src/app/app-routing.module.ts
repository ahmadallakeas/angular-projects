import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { Recipe } from './recipes/recipe.model';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipesStartComponent,
      },
      {
        component: RecipesEditComponent,
        path: 'new',
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipesEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
