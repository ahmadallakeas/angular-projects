import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';
const routes:Route[] = [
  {
    path: '',
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
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
