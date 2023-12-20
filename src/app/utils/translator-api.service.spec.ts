import { TestBed } from '@angular/core/testing';

import { TranslatorApiService } from './translator-api.service';

describe('TranslaterApiService', () => {
  let service: TranslatorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
