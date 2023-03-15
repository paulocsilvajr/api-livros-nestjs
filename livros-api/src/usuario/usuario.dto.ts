import { Contains, IsEmail, IsNotEmpty, Length, Matches, Min, MinLength } from 'class-validator';

export class CadastraUsuarioDto {
    @IsNotEmpty({
        message: 'Nome de usuário não pode ser vazio',
    })
    @Length(3, 50, {
        message: "Nome deve ter entre 5 e 50 caracteres"
    })
    nome: string;

    @IsEmail({}, {
        message: 'Email inválido'
    })
    @MinLength(6, {
        message: "Email deve ter pelo menos 6 caracteres"
    })
    email: string;

    @IsNotEmpty({
        message: 'Senha de usuário não pode ser vazia'
    })
    @MinLength(8, {
        message: "Senha deve ter pelo menos 8 caracteres"
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Senha deve conter letras(maiúsculas e minúsculas), números e símbolos"
    })
    senha: string;
}