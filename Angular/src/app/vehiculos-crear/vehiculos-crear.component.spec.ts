import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosCrearComponent } from './vehiculos-crear.component';

describe('VehiculosCrearComponent', () => {
  let component: VehiculosCrearComponent;
  let fixture: ComponentFixture<VehiculosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
