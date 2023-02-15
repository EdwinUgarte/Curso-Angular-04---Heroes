import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroeId: any;
  heroe!: Heroe;
  urlImage: string = '/assets/heroes/';

  constructor(
    private heroeService: HeroeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.heroeId = id));

    this.heroeService
      .getHeroe(this.heroeId)
      .subscribe((heroe) => (this.heroe = heroe));
  }
}
