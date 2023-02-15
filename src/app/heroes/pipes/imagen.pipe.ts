import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
 //? pure: false   Esto es solo necesario si necesitas que el pipe se actualice a cada cambio del ciclo de angular
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {

    if (!heroe.id) {
      return 'assets/no-image.png';
    } 
    else if(heroe.alt_img?.includes("http")){
      return heroe.alt_img;
    }
    else{
      return `assets/heroes/${heroe.id}.jpg`;
      
    }

  }
}
