import { HELP_DESK_API } from './helpdesk.api';
import { Chamado } from './../model/chamado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  createOrUpdate(chamado : Chamado ){
    if(chamado.id != null && chamado.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/ticket`,chamado);
    }else{
      chamado.id = null;
      chamado.titulo = 'NOVO';
      return this.http.post(`${HELP_DESK_API}/api/ticket`,chamado);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParams(page:number,count:number,atribuidoParaUsuario:boolean,c:Chamado){
    c.numero = c.numero == null ? 0 : c.numero;
    c.titulo = c.titulo == '' ? 'uninformed' : c.titulo;
    c.status = c.status == '' ? 'uninformed' : c.status;
    c.prioridade = c.prioridade == '' ? 'uninformed' : c.prioridade;

    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${c.numero}/${c.titulo}/${c.status}/${c.prioridade}/${atribuidoParaUsuario}`);
  }

  mudarStatus(status:string, chamado:Chamado){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${chamado.id}/${status}`,chamado);
  }

  summary(){
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }
}
