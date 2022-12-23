import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './modulo-usuario/empleado';
import { catchError, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url :string ="http://localhost:7280/api/empleados"
  constructor(private http:HttpClient) { }

  //obtiene el listado de empleados cidenet
  getAll():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.url);
  }

 //obtiene uno solo
 
   get(id : number):Observable<Empleado>
   {
       return this.http.get<Empleado>(this.url+'/'+id);
    }
   

//Crea un empleado
      create(empleado:Empleado):Observable<Empleado>
      {
        return this.http.post<Empleado>(this.url+'/crear-empleado', empleado);
      }

      //Modifica un empleado
      update(empleado:Empleado):Observable<Empleado>
      {
        return this.http.put<Empleado>(this.url,empleado);
      }

          //delete un empleado
          delete(id : number):Observable<Empleado>
          {
           return this.http.delete<Empleado>(this.url+'/'+id);
           }
}
