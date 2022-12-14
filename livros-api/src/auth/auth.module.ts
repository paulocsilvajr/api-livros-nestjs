import { Module } from "@nestjs/common";
import { UsuarioModule } from "src/usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";


@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule { }