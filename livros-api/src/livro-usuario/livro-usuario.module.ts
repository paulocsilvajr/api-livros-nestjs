import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LivroDisponivelModule } from "src/livro-disponivel/livro-disponivel.module";
import { LivroModule } from "src/livro/livro.module";
import { UsuarioModule } from "src/usuario/usuario.module";
import { LivroUsuarioController } from "./livro-usuario.controller";
import { LivroUsuario } from "./livro-usuario.entity";
import { LivroUsuarioService } from "./livro-usuario.service";

@Module({
    imports: [
        LivroModule,
        UsuarioModule,
        LivroDisponivelModule,
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