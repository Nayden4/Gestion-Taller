import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { InicioComponent } from './inicio/inicio.component';
import { FilterPipe } from './clientes-lista/filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientesCrearComponent } from './clientes-crear/clientes-crear.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesListaComponent,
    InicioComponent,
    FilterPipe,
    ClientesCrearComponent,
    ClientesEditarComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
