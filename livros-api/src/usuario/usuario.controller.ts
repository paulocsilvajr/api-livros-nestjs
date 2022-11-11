import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Post, UseInterceptors } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { CadastraUsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('api/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    public async buscaUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioService.buscaUsuarios();
        if (usuarios.length > 0)
            return usuarios;
        
        throw new NotFoundException('Não há usuários cadastrados');
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    public async cadastraUsuario(@Body() usuario: CadastraUsuarioDto): Promise<Usuario> {
        try {
            return await this.usuarioService.cadastraUsuario(usuario);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(`Erro no banco de dados, JSON: {"nome": "nome do usuário", "email": "email do usuário", "senha": "senha do usuário"}. ERRO: ${error.message}`);
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}