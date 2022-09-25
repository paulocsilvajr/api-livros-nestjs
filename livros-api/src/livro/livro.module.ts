import { Module } from "@nestjs/common";
import { LivroControler } from "./livro.controller";
import { LivroService } from "./livro.service";

@Module({
    controllers: [LivroControler],
    providers: [
        LivroService,
    ]
})
export class LivroModule {}