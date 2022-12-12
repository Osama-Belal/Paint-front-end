import { TestBed } from '@angular/core/testing';

import { DtoAdapterService } from './dto-adapter.service';

describe('DtoAdapterService', () => {
  let service: DtoAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtoAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
