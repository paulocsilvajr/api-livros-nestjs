import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UsuarioService } from "../usuario/usuario.service";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) { }

    async validadeUsuario(name: string, password: string) {
        const usuario: any = await this.usuarioService.buscaUsuarioPorNome(name);
        const confereSenha = await bcryptjs.compare(password, usuario.senha);
        if (usuario && confereSenha) {
            const { nome, email } = usuario;
            return { name: nome, email: email };
        }

        return null;
    }

    async login(user: any) {
        const payload = { id: user.id, email: user.email, sub: user.name }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}