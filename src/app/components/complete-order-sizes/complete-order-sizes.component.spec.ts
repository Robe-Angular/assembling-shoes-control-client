import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderSizesComponent } from './complete-order-sizes.component';

describe('CompleteOrderSizesComponent', () => {
  let component: CompleteOrderSizesComponent;
  let fixture: ComponentFixture<CompleteOrderSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOrderSizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteOrderSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
