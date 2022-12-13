import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe({
        next: (user) => {
          this.isAuthenticated = !!user;
        },
      });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSaveData() {
    this.store.dispatch(new RecipesActions.SaveRecipes());
  }
  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  onLogout() {
    // this.authService.logout();
    // this.isAuthenticated = false
    this.store.dispatch(new AuthActions.Logout());
  }
}
