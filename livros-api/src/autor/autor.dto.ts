import { IsNotEmpty, IsOptional } from 'class-validator';

export class CadastraAutorDto {
    @IsNotEmpty({
        message: 'Nome do autor não pode ser vazio',
    })
    nome: string;

    @IsOptional()
    descricao: string;
}