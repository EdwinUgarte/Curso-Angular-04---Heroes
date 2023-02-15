import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interface/usuario.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


   //? +++++++++++++++++++++++++++++++ Propiedades ++++++++++++++++++++++++++++++++++++++++++++++++++++
   
   private endPoint: string = `${environment.endPoint}/usuarios`;
   private _usuario: Usuario | undefined;
   
   get usuario(): Usuario {
     return { ...this._usuario! };
    }
    
    
    constructor(private http: HttpClient) {}
    
    
    
    
    //? +++++++++++++++++++++++++++++++ Metodos ++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    
  //* +++++++++++++++++++++++++++++++ Verificacion ++++++++++++++++++++++++++++++++++++++++++++++++++++
  verificaAutenticacion(): Observable<boolean>  {
    
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Usuario>(`${this.endPoint}/1`)
                    .pipe(
                       map(auth => {
                       console.log('map', auth);
                       this._usuario = auth;
                       return true;
                      })
                    );
  }




  //* +++++++++++++++++++++++++++++++ Login ++++++++++++++++++++++++++++++++++++++++++++++++++++
  login() {
    return this.http.get<Usuario>(`${this.endPoint}/1`).pipe(
      tap((res) => (this._usuario = res)),
      tap((res) => localStorage.setItem('token', res.id))
    );
  }

  
  
  
  //* +++++++++++++++++++++++++++++++ Logout ++++++++++++++++++++++++++++++++++++++++++++++++++++
  logout() {
    this._usuario = undefined;
    localStorage.removeItem('token');
  }
}
