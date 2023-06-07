import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/ICliente';
import { Observable, catchError, throwError } from 'rxjs';
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

  public postCliente(dada: any): Observable<any> {
    return this._http.post(environment.apiUrl + 'cliente', dada, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
}
