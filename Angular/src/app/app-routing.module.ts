import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesCrearComponent } from './clientes-crear/clientes-crear.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path:'clientes-lista', component: ClientesListaComponent},
  {path:'clientes-crear', component: ClientesCrearComponent},
  {path:'clientes-editar', component: ClientesCrearComponent},
  { path: '', component: InicioComponent},
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
