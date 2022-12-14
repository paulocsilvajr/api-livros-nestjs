import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { verificaArray } from "src/util/verifica-entidade";
import { QueryFailedError } from "typeorm";
import { CadastraUsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('api/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':nome')
    public async buscaUsuarioPorNome(@Param('nome') nomeUsuario: string): Promise<Usuario> {
        return this.usuarioService.buscaUsuarioPorNome(nomeUsuario);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/email/:email')
    public async buscaUsuarioPorEmail(@Param('email') emailUsuario: string): Promise<Usuario> {
        return this.usuarioService.buscaUsuarioPorEmail(emailUsuario);
    }
}