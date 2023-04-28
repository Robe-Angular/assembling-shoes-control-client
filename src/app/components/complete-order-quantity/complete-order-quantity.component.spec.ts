import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderQuantityComponent } from './complete-order-quantity.component';

describe('CompleteOrderQuantityComponent', () => {
  let component: CompleteOrderQuantityComponent;
  let fixture: ComponentFixture<CompleteOrderQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOrderQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteOrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
