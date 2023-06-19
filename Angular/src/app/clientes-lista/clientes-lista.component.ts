import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes.service';
import { ICliente } from '../interfaces/ICliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent {
  router: any;
  constructor(private clientesService: ClientesService) { }
  clientes: ICliente[] = [];
  listFilter: string = '';

  itemsPerPage: number = 7;
  currentPage: number = 1;


  ngOnInit(): void {

    console.log("Listado de clientes inicializado");
    this.clientesService.getClientes().subscribe(resp => {
      if (resp.body) this.clientes = resp.body.reverse();
    });
  }

  confirmarEliminacion(): boolean {
    return confirm("¿Está seguro de que desea eliminar este cliente?");
  }

  eliminarCliente(id: any) {
    if (this.confirmarEliminacion()) {
      this.clientesService.deleteCliente(id)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => {
            console.log(error);
          });
    }
    this.router.navigate(['clientes-lista']);
  }


}


