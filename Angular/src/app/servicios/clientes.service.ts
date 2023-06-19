import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/ICliente';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http: HttpClient) { }

  public getClientes(): Observable<HttpResponse<ICliente[]>> {
    return this._http.get<ICliente[]>(environment.apiUrl + 'clientes', {
      observe: 'response',
    });
  }

  public getCliente(id: any): Observable<ICliente> {
    return this._http.get<ICliente>(`${environment.apiUrl}cliente/${id}`);
  }

  public postCliente(dada: any): Observable<any> {
    return this._http.post(environment.apiUrl + 'cliente', dada, { observe: 'response' })
  }

  public putCliente(id: any, dada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    const options = { params: new HttpParams().set('observe', 'response') }
    console.log(dada);
    return this._http.post(`${environment.apiUrl}cliente/${id}`, dada, {
      observe: 'response', headers: new HttpHeaders({
      })
    });

  }

  public deleteCliente(id: any): Observable<any> {
    return this._http.delete(`${environment.apiUrl}cliente/${id}`);
  }

  public clientesBuscar(parametro: any): Observable<HttpResponse<ICliente[]>> {
    return this._http.get<ICliente[]>(environment.apiUrl + 'clientesBuscar/' + parametro, {
      observe: 'response',
    });
  }



}
