import { TestBed } from '@angular/core/testing';

import { DragHandlerService } from './drag-handler.service';

describe('DragHandlerService', () => {
  let service: DragHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
