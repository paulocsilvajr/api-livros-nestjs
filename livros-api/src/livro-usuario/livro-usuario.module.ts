import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LivroUsuarioController } from "./livro-usuario.controller";
import { LivroUsuario } from "./livro-usuario.entity";
import { LivroUsuarioService } from "./livro-usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([LivroUsuario])],
    controllers: [
        LivroUsuarioController,
    ],
    providers: [
        LivroUsuarioService,
    ]
})
export class LivroUsuarioModule {}