import { TestBed } from '@angular/core/testing';

import { LoggingInterceptService } from './logging-intercept.service';

describe('LoggingInterceptService', () => {
  let service: LoggingInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
