import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

class CadastraLivroUsuarioDto {
    @IsNotEmpty({
        message: 'Nome do usuário não pode ser vazio',
    })    
    usuario: string;

    @IsPositive({
        message: 'Código do livro deve ser um número identificador maior que 0',
    })
    livro: number;

    @IsDateString({}, {
        message: 'Data de início de leitura com formato inválido',
    })
    dataInicioLeitura: Date;

    @IsOptional()
    @IsDateString({}, {
        message: 'Data de fim de leitura com formato inválido',
    })
    dataFimLeitura: Date;
}

export { CadastraLivroUsuarioDto }