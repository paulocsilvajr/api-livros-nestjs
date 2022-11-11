import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post } from "@nestjs/common";
import { CadastraUsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('api/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @Get()
    public async buscaUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioService.buscaUsuarios();
        if (usuarios.length > 0)
            return usuarios;
        
        throw new NotFoundException('Não há usuários cadastrados');
    }

    @Post()
    public async cadastraUsuario(@Body() usuario: CadastraUsuarioDto): Promise<Usuario> {
        try {
            return await this.usuarioService.cadastraUsuario(usuario);
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}