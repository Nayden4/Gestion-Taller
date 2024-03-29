import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesCrearComponent } from './clientes-crear/clientes-crear.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';
import { VehiculosListaComponent } from './vehiculos-lista/vehiculos-lista.component';
import { VehiculosCrearComponent } from './vehiculos-crear/vehiculos-crear.component';
import { VehiculosEditarComponent } from './vehiculos-editar/vehiculos-editar.component';
import { FacturasListaComponent } from './facturas-lista/facturas-lista.component';
import { FacturasCrearComponent } from './facturas-crear/facturas-crear.component';
import { FacturasDownloadComponent } from './facturas-download/facturas-download.component';
import { FacturasEditarComponent } from './facturas-editar/facturas-editar.component';

const routes: Routes = [
  {path:'clientes-lista', component: ClientesListaComponent},
  {path:'clientes-crear', component: ClientesCrearComponent},
  {path:'clientes-editar/:id', component: ClientesEditarComponent},

  {path:'vehiculos-lista', component: VehiculosListaComponent},
  {path:'vehiculos-crear', component: VehiculosCrearComponent},
  {path:'vehiculos-editar/:id', component: VehiculosEditarComponent},

  {path:'facturas-lista', component: FacturasListaComponent},
  {path:'facturas-crear', component: FacturasCrearComponent},
  {path:'facturas-download/:id', component: FacturasDownloadComponent},
  {path:'facturas-editar/:id', component: FacturasEditarComponent},



  { path: '', component: InicioComponent},
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
