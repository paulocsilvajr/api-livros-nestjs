import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, MinLength } from "class-validator";

class CadastraLivroDto {
    @IsNotEmpty({
        message: 'Título do livro não pode ser vazio',
    })
    titulo: string;

    @IsPositive({
        message: 'ID do autor deve ser um número identificador maior que 0'
    })
    autor: number;

    @IsOptional()
    @MinLength(3, {
        message: 'Resumo do livro deve ter pelo menos 3 caracteres',
    })
    resumo: string;

    @IsNumber({}, {
        message: 'Número de páginas deve ser um número'
    })
    @Min(1, {
        message: 'Número de páginas deve ser pelo menos 1 página',
    })
    numeroPaginas: number;

    @IsDateString({}, {
        message: 'Data de compra com formato inválido',
    })
    dataCompra: string;
}

class AlteraLivroDto extends CadastraLivroDto {
    @IsNotEmpty({
        message: 'ID deve ser informado',
    })
    @IsNumber({}, {
        message: 'ID deve ser um número',
    })
    id: number;
}

export { CadastraLivroDto, AlteraLivroDto }