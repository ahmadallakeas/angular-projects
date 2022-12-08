import { HttpEvent, HttpEventType, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  console.log('Logging:')
    console.log(req.url);
  return  next.handle(req).pipe(tap(event=>
    {
      if(event.type === HttpEventType.Response)
      {
        console.log('Incoming respone')
        console.log(event.body);
      }
    }));
  }
}
