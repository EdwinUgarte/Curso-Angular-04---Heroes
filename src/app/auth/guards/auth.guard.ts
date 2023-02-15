import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,  CanLoad {

  constructor (private authService: AuthService, private router : Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.verificaAutenticacion()
    .pipe(
          tap((estaAutenticado: boolean) => {
            if(!estaAutenticado){
            this.router.navigate(['/auth/login'])
            }
            })
          )

    //   if(this.authService.usuario.id){
    //     return true;
    //   }
    
    //   console.log('bloqueado por el authguard | CanActivated');
    // return false;


    // return true;
  }

  

  canLoad(

    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
    
      return this.authService.verificaAutenticacion().pipe(
        tap((estaAutenticado: boolean) => {
          if(!estaAutenticado){
          this.router.navigate(['/auth/login'])
          }
          })
        )


    //   if(this.authService.usuario.id){
    //     return true;
    //   }
    
    //   console.log('bloqueado por el authguard | CanLoad');
    // return false;
  }
}
