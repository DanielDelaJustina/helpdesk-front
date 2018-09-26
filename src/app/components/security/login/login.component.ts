import { UsuarioService } from './../../../services/usuario.service';
import { SharedService } from './../../../services/shared.service';
import { Usuario } from './../../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../model/current-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new Usuario('','','','');
  shared : SharedService;
  alerta : string;

  constructor(
    private usuarioService : UsuarioService,
    private router : Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  login(){
    this.alerta = '';
    this.usuarioService.login(this.user).subscribe((userAuthentication : CurrentUser) => {
       this.shared.token = userAuthentication.token;
       this.shared.user = userAuthentication.user;
       this.shared.user.profile = this.shared.user.profile.substring(5);
       this.shared.showTemplate.emit(true);
       this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.alerta = 'Erro';
    });
  }

  cancelLogin(){
    this.alerta = '';
    this.user = new Usuario('','','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty):  {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-sucess': !isInvalid && isDirty
    };
  }
}
