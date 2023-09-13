import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasEditarComponent } from './facturas-editar.component';

describe('FacturasEditarComponent', () => {
  let component: FacturasEditarComponent;
  let fixture: ComponentFixture<FacturasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
