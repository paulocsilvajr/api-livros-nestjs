import { Module } from "@nestjs/common";
import { LivroDisponivelController } from "./livro-disponivel.controller";
import { LivroDisponivelService } from "./livro-disponivel.service";

@Module({
    imports: [

    ],
    exports: [
        LivroDisponivelService,
    ],
    controllers: [
        LivroDisponivelController,
    ],
    providers: [
        LivroDisponivelService,
    ]
})

export class LivroDisponivelModule {}