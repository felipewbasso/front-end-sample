import { Injectable } from "@angular/core";

import { UsuarioDetalheModel } from "app/models/usuario/usuario-detalhe.model";
import { UsuarioListaModel } from "app/models/usuario/usuario-lista.model";

@Injectable()
export class UsuarioService {

    usuarios: UsuarioDetalheModel[] = [];

    constructor() {

        this.usuarios = [
            {
                id: 1,
                nomeCompleto: 'Felipe Basso',
                nomeDeUsuario: 'felipe.basso',
                email: 'felipe.basso@email.com',
                idade: 23,
                senha: 'acessar@123'
            },
            {
                id: 2,
                nomeCompleto: 'Eric Basso',
                nomeDeUsuario: 'eric.basso',
                email: 'eric.basso@email.com',
                idade: 19,
                senha: 'acessar@123'
            },
            {
                id: 3,
                nomeCompleto: 'Gabriel Seima',
                nomeDeUsuario: 'gabriel.seima',
                email: 'gabriel.seima@email.com',
                idade: 21,
                senha: 'acessar@123'
            },
        ]
    }

    listartUsuarios(): UsuarioListaModel[] {

        let listaUsuarios = this.usuarios
            .map(u => {

                return <UsuarioListaModel>{
                    id: u.id,
                    nome: u.nomeCompleto,
                    email: u.email
                };
            });

        return listaUsuarios;
    }

    obterUsuarioPorId(id: number): UsuarioDetalheModel {

        let usuario = this.usuarios
            .find(u => u.id == id);

        if (usuario != null) {
            return usuario;
        }

        return null;
    }
}
