import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postSubject: Subject<string> = new Subject();
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, body: string) {
    const postData: Post = { title: title, content: body };
    this.http
      .post<{ name: string }>(
        'https://http-practice-de7ce-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          this.postSubject.error(error.message);
        },
      });
  }
  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('limit', '10');
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://http-practice-de7ce-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({
            'custom-headers': 'Ahmad',
            'Accept': 'application/json',
          }),
          params: searchParams,
        }
      )
      .pipe(
        map((response) => {
          const result: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              result.push({ ...response[key], id: key });
            }
          }
          return result;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  deletePosts() {
    return this.http
      .delete(
        'https://http-practice-de7ce-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
        }
      )
      .pipe(
        tap((events) => {
          if (events.type === HttpEventType.Response) {
            console.log(events.body);
          }
        })
      );
  }
}
