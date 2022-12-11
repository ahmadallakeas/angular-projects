import { outputAst } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipesChangedSubject;
  recepies: Recipe[];
  constructor(
    private reciepesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.recipesChangedSubject = this.reciepesService.recipesChanged.subscribe({
      next: (recipes: Recipe[]) => {
        this.recepies = recipes;
      },
    });
    this.recepies = this.reciepesService.getRecipes();
  }
  ngOnDestroy(): void {
    this.recipesChangedSubject.unsubscribe();
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
