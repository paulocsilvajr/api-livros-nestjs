import { IsNotEmpty, IsOptional, IsNumber, MinLength, Length } from 'class-validator';

class CadastraAutorDto {
    @IsNotEmpty({
        message: 'Nome do autor não pode ser vazio',
    })
    @Length(3, 50, {
        message: "Nome do autor deve ter entre 5 e 50 caracteres"
    })
    nome: string;

    @IsOptional()
    @MinLength(3, {
        message: 'Descrição deve ter pelo menos 3 caracteres',
    })
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