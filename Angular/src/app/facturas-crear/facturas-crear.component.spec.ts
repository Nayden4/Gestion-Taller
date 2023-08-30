import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasCrearComponent } from './facturas-crear.component';

describe('FacturasCrearComponent', () => {
  let component: FacturasCrearComponent;
  let fixture: ComponentFixture<FacturasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
