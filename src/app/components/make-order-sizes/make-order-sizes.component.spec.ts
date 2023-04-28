import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderSizesComponent } from './make-order-sizes.component';

describe('MakeOrderSizesComponent', () => {
  let component: MakeOrderSizesComponent;
  let fixture: ComponentFixture<MakeOrderSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeOrderSizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
