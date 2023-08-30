import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasDownloadComponent } from './facturas-download.component';

describe('FacturasDownloadComponent', () => {
  let component: FacturasDownloadComponent;
  let fixture: ComponentFixture<FacturasDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
