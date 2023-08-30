import { Injectable } from '@angular/core';
import { IVehiculo } from '../interfaces/IVehiculo';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(private _http: HttpClient) { }

  public getVehiculos(): Observable<HttpResponse<IVehiculo[]>> {
    return this._http.get<IVehiculo[]>(environment.apiUrl + 'vehiculos', { observe: 'response' });
  }

  public getVehiculo(id: any): Observable<IVehiculo> {
    return this._http.get<IVehiculo>(`${environment.apiUrl}vehiculo/${id}`);
  }

  public postVehiculo(dada: any): Observable<any> {
    return this._http.post(environment.apiUrl + 'vehiculo', dada, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  public putVehiculo(id: any, dada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    const options = { params: new HttpParams().set('observe', 'response') }
    console.log(dada);
    return this._http.post(`${environment.apiUrl}vehiculo/${id}`, dada, {
      observe: 'response', headers: new HttpHeaders({
      })
    });

  }
  public deleteVehiculo(id: any): Observable<any> {
    return this._http.delete(`${environment.apiUrl}vehiculo/${id}`);
  }

  public getProximasItv(): Observable<HttpResponse<IVehiculo[]>> {
    return this._http.get<IVehiculo[]>(environment.apiUrl + 'vehiculos-itv', { observe: 'response' });
  }

  public getVehiculoCliente(idClient: any): Observable<HttpResponse<IVehiculo[]>>{
    return this._http.get<IVehiculo[]>(environment.apiUrl + 'vehiculo-cliente/' + idClient, { observe: 'response' });
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
