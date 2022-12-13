import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, UseInterceptors } from "@nestjs/common";
import { verificaArray } from "src/util/verifica-entidade";
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
        
        verificaArray(usuarios, 'usuários');
        
        return usuarios;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    public async cadastraUsuario(@Body() usuario: CadastraUsuarioDto): Promise<Usuario> {
        try {
            return await this.usuarioService.cadastraUsuario(usuario);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(error.message);
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':nome')
    public async buscaUsuarioPorNome(@Param('nome') nomeUsuario: string): Promise<Usuario> {
        return this.usuarioService.buscaUsuarioPorNome(nomeUsuario);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/email/:email')
    public async buscaUsuarioPorEmail(@Param('email') emailUsuario: string): Promise<Usuario> {
        return this.usuarioService.buscaUsuarioPorEmail(emailUsuario);
    }
}