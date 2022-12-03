import { TestBed } from '@angular/core/testing';

import { ShapeDataService } from './shape-data.service';

describe('ShapeDataService', () => {
  let service: ShapeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
