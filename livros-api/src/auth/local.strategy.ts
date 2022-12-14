import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) { 
        super({
            usernameField: 'nome',
            passwordField: 'senha',
        });
     }

    async validate(name: string, password: string): Promise<any> {
        const usuario = await this.authService.validadeUsuario(name, password);
        if (!usuario) {
            throw new UnauthorizedException();
        }
        return usuario;
    }
}