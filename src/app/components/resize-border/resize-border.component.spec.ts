import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeBorderComponent } from './resize-border.component';

describe('ResizeBorderComponent', () => {
  let component: ResizeBorderComponent;
  let fixture: ComponentFixture<ResizeBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizeBorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
