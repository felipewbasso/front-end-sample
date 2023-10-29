import { Component, OnInit } from "@angular/core";

import { UsuarioListaModel } from "app/models/usuario/usuario-lista.model";

import { UsuarioService } from "../../services/usuario.service";

@Component({
    selector: 'app-usuario-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

    usuarios: UsuarioListaModel[] = [];

    constructor(
        private _usuarioService: UsuarioService
    ) { }

    ngOnInit(): void {

        this.usuarios = this._usuarioService.listartUsuarios();
    }
}
