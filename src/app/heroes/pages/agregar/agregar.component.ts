import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publishers: string[] = ['DC Comics', 'Marvel Comics'];

  paramsId: any;

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroeService: HeroeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.heroe);
    let id = '';
    this.activeRoute.params.subscribe(({ id }) => (this.paramsId = id));
    this.heroeService
      .getHeroe(this.paramsId)
      .subscribe((res) => (this.heroe = res));
  }

  //?************************************************************** Metodo Guardar **************************************************************************************
  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    Swal.fire({
      title: 'Seguro que deseas guardar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Descartar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Guardado!', '', 'success'),
          this.heroeService.guardarHeroe(this.heroe).subscribe((res) => {
            this.router.navigate(['/heroes/']);
          });
      } else if (result.isDenied) {
        Swal.fire('No guardado', '', 'info');
      }
    });
  }

  //?************************************************************** Metodo Actualizar **************************************************************************************
  actualizar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    Swal.fire({
      title: 'Seguro que deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Actualizar cambios',
      denyButtonText: `Descartar cambios`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Actualizado con exito!', '', 'success'),
          this.heroeService.actualizarHeroe(this.heroe).subscribe((res) => {
            this.heroe = res;
            this.router.navigate(['/heroes/']);
          });
      } else if (result.isDenied) {
        Swal.fire('No guardado', '', 'info');
        this.router.navigate(['/heroes/']);
      }
    });
  }

  //?************************************************************** Metodo Eliminar **************************************************************************************
  eliminar() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Si lo haces no se podra recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'El héroe se elimino con exito.', 'success');

        this.heroeService.deleteHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(['/heroes/']);
        });
      }
    });
  }
}
