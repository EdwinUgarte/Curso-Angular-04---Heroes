import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private url : string = environment.endPoint;

  endPoint: string = `${this.url}/heroes`;

  constructor(private http: HttpClient) {}

  
  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.endPoint);
  }


  getHeroe(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.endPoint}/${id}`);
  };

  getSugerencia(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.endPoint}?q=${termino}`);
  }


  guardarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.endPoint, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.endPoint}/${heroe.id}`, heroe);
  }


  deleteHeroe(id: string): Observable<Heroe> {
    return this.http.delete<Heroe>(`${this.endPoint}/${id}`);
  }

}
