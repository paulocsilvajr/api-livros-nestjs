import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutorModule } from "src/autor/autor.module";
import { LivroControler } from "./livro.controller";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Module({
    imports: [
        AutorModule,
        TypeOrmModule.forFeature([Livro])
    ],
    exports: [
        LivroService,
    ],
    controllers: [
        LivroControler,
    ],
    providers: [
        LivroService,
    ]
})
export class LivroModule {}