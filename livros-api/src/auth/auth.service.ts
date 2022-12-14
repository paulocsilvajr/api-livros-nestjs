import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UsuarioService } from "../usuario/usuario.service";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) { }

    async validadeUsuario(nomeUsuario: string, senhaUsuario: string) {
        try {
            const usuario: any = await this.usuarioService.buscaUsuarioPorNome(nomeUsuario);
            const confereSenha = await bcryptjs.compare(senhaUsuario, usuario.senha);
            if (usuario && confereSenha) {
                const { nome, email } = usuario;
                return { name: nome, email: email };
            }

            return null;
        } catch (error) {
            throw new UnauthorizedException();            
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.name }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}