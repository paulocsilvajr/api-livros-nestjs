import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

class CadastraAutorDto {
    @IsNotEmpty({
        message: 'Nome do autor não pode ser vazio',
    })
    nome: string;

    @IsOptional()
    descricao: string;
}

class AlteraAutorDto extends CadastraAutorDto {
    @IsNotEmpty({
        message: 'ID deve ser informado',
    })
    @IsNumber({}, {
        message: 'ID deve ser um número',
    })
    id: number;
}

export { CadastraAutorDto, AlteraAutorDto }