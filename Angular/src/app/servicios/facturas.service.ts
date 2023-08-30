import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFactura } from '../interfaces/IFactura';
import { Observable, ObservableInput, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private _http: HttpClient) { }

  public getFacturas(): Observable<HttpResponse<IFactura[]>> {
    return this._http.get<IFactura[]>(environment.apiUrl + 'facturas', { observe: 'response' });
  }

  public getFactura(id: any): Observable<IFactura> {
    return this._http.get<IFactura>(`${environment.apiUrl}factura/${id}`);
  }

  public getUltimaFactura(): Observable<IFactura> {
    return this._http.get<IFactura>(`${environment.apiUrl}ultimaFactura`);
  }

  public postFactura(dada: any): Observable<any> {
    return this._http.post(environment.apiUrl + 'factura', dada, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteFactura(id: any): Observable<any> {
    return this._http.delete(`${environment.apiUrl}factura/${id}`);
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
