import { Usuario } from './usuario.model';
export class Chamado{

    constructor(
        public id: string,
        public numero: number,
        public titulo: string,
        public status: string,
        public prioridade: string,
        public imagem: string,
        public user: Usuario,
        public usuarioAtribuido: Usuario,
        public data: string,
        public alteracoes: Array<string>
    ){ }
}