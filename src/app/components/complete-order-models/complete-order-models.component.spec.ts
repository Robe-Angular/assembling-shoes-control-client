import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderModelsComponent } from './complete-order-models.component';

describe('CompleteOrderModelsComponent', () => {
  let component: CompleteOrderModelsComponent;
  let fixture: ComponentFixture<CompleteOrderModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOrderModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteOrderModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
