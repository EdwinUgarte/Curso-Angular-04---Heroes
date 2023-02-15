import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];
  nombre: string = '';

  constructor(private heroesService : HeroeService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => {
        this.heroes = heroes;
    })
  }


  

}
