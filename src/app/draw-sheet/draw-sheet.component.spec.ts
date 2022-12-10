import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawSheetComponent } from './draw-sheet.component';

describe('DrawSheetComponent', () => {
  let component: DrawSheetComponent;
  let fixture: ComponentFixture<DrawSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
