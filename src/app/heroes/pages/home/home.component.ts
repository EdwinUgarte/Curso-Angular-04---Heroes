import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interface/usuario.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // usuario!: Usuario;

  get usuario(){
    return this.authService.usuario
  }
  
  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {


  }

  logout(){

    Swal.fire({
      title: 'Estas seguro que deseas salir?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.router.navigate(['/auth/login'])
       this.authService.logout();
      }
    })


  }

}
