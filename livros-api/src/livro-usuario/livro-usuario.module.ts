import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LivroModule } from "src/livro/livro.module";
import { UsuarioModule } from "src/usuario/usuario.module";
import { LivroUsuarioController } from "./livro-usuario.controller";
import { LivroUsuario } from "./livro-usuario.entity";
import { LivroUsuarioService } from "./livro-usuario.service";

@Module({
    imports: [
        LivroModule,
        UsuarioModule,
        TypeOrmModule.forFeature([LivroUsuario])
    ],
    controllers: [
        LivroUsuarioController,
    ],
    providers: [
        LivroUsuarioService,
    ]
})
export class LivroUsuarioModule {}