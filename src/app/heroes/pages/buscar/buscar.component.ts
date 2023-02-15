import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroeService: HeroeService, private router: Router) { }

  ngOnInit(): void {
  }


  buscando(){
    this.heroeService.getSugerencia(this.termino.trim()).subscribe(
      heroes => this.heroes = heroes
    )
  }

  opcionSeleccionada(event: any){
  
   

   const heroe : Heroe = event.option.value;

   if(!heroe){
    this.heroeSeleccionado = undefined;
    return console.log("no hay valor");
   }

   this.termino = heroe.superhero;
  // this.router.navigate([`heroes/${heroe.id}`])
  this.heroeService.getHeroe(heroe.id!).subscribe(heroe => this.heroeSeleccionado = heroe)
  
   

  }

}
