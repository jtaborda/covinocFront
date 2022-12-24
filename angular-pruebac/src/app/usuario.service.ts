import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './modulo-usuario/usuario';
import { catchError, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  private url :string ="http://localhost:8080/api/"
  constructor(private http:HttpClient) { }

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url+'listarAll');
  }

 //obtiene uno solo
 
   /*get(id : number):Observable<Usuario>
   {
       return this.http.get<Usuario>(this.url+'listarById/'+id);
    }*/


    getCedula(cedula : number):Observable<Usuario>
    {
        return this.http.get<Usuario>(this.url+'listarByCedula/'+cedula);
     }
   

//Crea un empleado
      create(usuario:Usuario):Observable<Usuario>
      {
        return this.http.post<Usuario>(this.url, usuario);        
      }

      //Modifica un empleado
      update(usuario:Usuario):Observable<Usuario>
      {
        return this.http.put<Usuario>(this.url+'update/',usuario);
      }

          //delete un empleado
          delete(id : number):Observable<Usuario>
          {
           return this.http.delete<Usuario>(this.url+'delete/'+id);
           }

           
}
