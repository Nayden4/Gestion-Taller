import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes.service';
import { ICliente } from '../interfaces/ICliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent {
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


}


