import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderQuantityComponent } from './make-order-quantity.component';

describe('MakeOrderQuantityComponent', () => {
  let component: MakeOrderQuantityComponent;
  let fixture: ComponentFixture<MakeOrderQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeOrderQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
