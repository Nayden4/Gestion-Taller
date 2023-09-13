import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesFilterPipe } from './clientes-lista/clientes-filter.pipe';
import { VehiculosFilterPipe } from './vehiculos-lista/vehiculos-filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientesCrearComponent } from './clientes-crear/clientes-crear.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';
import { VehiculosListaComponent } from './vehiculos-lista/vehiculos-lista.component';
import { VehiculosCrearComponent } from './vehiculos-crear/vehiculos-crear.component';
import { VehiculosEditarComponent } from './vehiculos-editar/vehiculos-editar.component';
import { FacturasListaComponent } from './facturas-lista/facturas-lista.component';
import { FilterPipe } from './facturas-lista/filter.pipe';
import { FacturasCrearComponent } from './facturas-crear/facturas-crear.component';
import { FacturasDownloadComponent } from './facturas-download/facturas-download.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FacturasEditarComponent } from './facturas-editar/facturas-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesListaComponent,
    InicioComponent,
    ClientesFilterPipe,
    ClientesCrearComponent,
    ClientesEditarComponent,
    VehiculosListaComponent,
    VehiculosFilterPipe,
    VehiculosCrearComponent,
    VehiculosEditarComponent,
    FacturasListaComponent,
    FilterPipe,
    FacturasCrearComponent,
    FacturasDownloadComponent,
    NavBarComponent,
    FacturasEditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule

  ],
  exports: [NavBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
