import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recepies: Recipe[];
  constructor(
    private reciepesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.recepies = this.reciepesService.getRecipes();
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
