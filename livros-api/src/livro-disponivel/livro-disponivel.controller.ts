import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LivroDisponivel } from "./livro-disponivel.entity";
import { LivroDisponivelService } from "./livro-disponivel.service";

@Controller('api/livrosdisponiveis')
export class LivroDisponivelController {
    constructor(private livroDisponivelService: LivroDisponivelService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    public async buscaLivrosDisponiveis(): Promise<LivroDisponivel[]> {
        const livrosDisponiveis = await this.livroDisponivelService.buscaLivrosDisponiveis();

        return livrosDisponiveis
    }
}