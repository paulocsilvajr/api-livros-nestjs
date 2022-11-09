import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LivroUsuario } from "./livro-usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LivroUsuario])],
    controllers: [

    ],
    providers: [
        
    ]
})
export class LivroUsuarioModule {}