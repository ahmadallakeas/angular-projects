import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  fetching: boolean = false;
  error = null;
  private sub: Subscription;
  constructor(private postService: PostService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.postService.postSubject.subscribe(
      (error) => (this.error = error)
    );
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.fetching = true;
    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.loadedPosts = posts;
        this.fetching = false;
      },
      error: (error) => {
        this.fetching = false;
        this.error = error.message;
      },
    });
  }
  private fetchPosts() {}
  onClearPosts() {
    this.postService.deletePosts().subscribe({
      next: () => {
        this.loadedPosts = [];
      },
    });
  }
  onHandleError() {
    this.error = null;
  }
}
