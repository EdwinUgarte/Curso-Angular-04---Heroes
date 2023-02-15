import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css']
})
export class HeroeCardComponent {

  //? El signo ! nos ayuda a decirle a angular que confie que siempre va a tener una respuesta
  @Input() heroe!: Heroe;

  
}
