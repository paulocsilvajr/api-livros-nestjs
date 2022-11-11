import { IsEmail, IsNotEmpty } from 'class-validator';

export class CadastraUsuarioDto {
    @IsNotEmpty({
        message: 'Nome de usuário não pode ser vazio',
    })
    nome: string;

    @IsEmail({}, {
        message: 'Email inválido'
    })
    email: string;

    @IsNotEmpty({
        message: 'Senha de usuário não pode ser vazia'
    })
    senha: string;
}