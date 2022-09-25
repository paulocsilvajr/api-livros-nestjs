import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LivroControler } from "./livro.controller";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Module({
    imports: [TypeOrmModule.forFeature([Livro])],
    controllers: [
        LivroControler,
    ],
    providers: [
        LivroService,
    ]
})
export class LivroModule {}