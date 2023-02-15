import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LivroDisponivelService } from "src/livro-disponivel/livro-disponivel.service";
import { Livro } from "src/livro/livro.entity";
import { LivroService } from "src/livro/livro.service";
import { UsuarioService } from "src/usuario/usuario.service";
import { verifica } from "src/util/verifica-entidade";
import { Repository } from "typeorm";
import { AlteraLivroUsuarioDto, CadastraLivroUsuarioDto } from "./livro-usuario.dto";
import { LivroUsuario } from "./livro-usuario.entity";

@Injectable()
export class LivroUsuarioService {
    constructor(
        @InjectRepository(LivroUsuario) private livroUsuarioRepository: Repository<LivroUsuario>,
        private livroService: LivroService,
        private usuarioService: UsuarioService,
        private livroDisponivelService: LivroDisponivelService,
    ) {}

    public async buscaLivrosUsuarios(): Promise<LivroUsuario[]> {
        return this.livroUsuarioRepository.find();
    }

    public async buscaLivrosUsuariosDetalhado(): Promise<LivroUsuario[]> {
        const query = this.livroUsuarioRepository
            .createQueryBuilder('lu')
            .orderBy()
            .innerJoinAndSelect('lu.usuario', 'u')
            .innerJoinAndSelect('lu.livro', 'l');
        
        const livrosUsuarios = await query.getMany()

        return livrosUsuarios;
    }

    public async buscaLivroUsuarioPorId(idLivroUsuario: number): Promise<LivroUsuario> {
        const query = this.livroUsuarioRepository
            .createQueryBuilder('lu')
            .orderBy()
            .innerJoinAndSelect('lu.usuario', 'u')
            .innerJoinAndSelect('lu.livro', 'l')
            .where({ id: idLivroUsuario });
        const livroUsuario = await query.getOne();

        verifica(livroUsuario, idLivroUsuario, 'Livro associado a usuário');

        return livroUsuario;
    }

    public async buscaLivrosUsuariosPorLivro(idLivro: number): Promise<LivroUsuario[]> {
        return this.livroUsuarioRepository.find(
            { where: { livroId: idLivro } });
    }

    public async buscaLivrosUsuariosPorUsuario(nomeUsuario: string): Promise<LivroUsuario[]> {
        return this.livroUsuarioRepository.find(
            { where: { usuarioNome: nomeUsuario } });
    }

    public async cadastraLivroUsuario(livroUsuario: CadastraLivroUsuarioDto): Promise<LivroUsuario> {
        // const dataInicioLeitura = new Date(livroUsuario.dataInicioLeitura.toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Sao_Paulo' }));
        const dataInicioLeitura = new Date(livroUsuario.dataInicioLeitura);
        let dataFimLeitura: null | Date = null;
        if (livroUsuario.dataFimLeitura) {
            dataFimLeitura = new Date(livroUsuario.dataFimLeitura);
        }

        const livro = await this.livroDisponivelService.buscaLivroDisponivelPorId(livroUsuario.livro);

        const usuario = await this.usuarioService.buscaUsuarioPorNome(livroUsuario.usuario);

        const livroUsuarioNovo = new LivroUsuario({
            usuario: usuario,
            livro: livro,
            dataInicioLeitura: dataInicioLeitura,
            dataFimLeitura: dataFimLeitura,
        });

        return this.livroUsuarioRepository.save(livroUsuarioNovo);
    }

    public async alteraLivroUsuario(idLivroUsuario: number, livroUsuarioAlteracao: AlteraLivroUsuarioDto): Promise<LivroUsuario> {
        const dataInicioLeitura = new Date(livroUsuarioAlteracao.dataInicioLeitura);
        let dataFimLeitura: null | Date = null;
        if (livroUsuarioAlteracao.dataFimLeitura) {
            dataFimLeitura = new Date(livroUsuarioAlteracao.dataFimLeitura);
        }

        const livroUsuarioBanco = await this.buscaLivroUsuarioPorId(idLivroUsuario);

        var livro: Livro
        if (livroUsuarioAlteracao.livro != livroUsuarioBanco.livroId) {
            livro = await this.livroDisponivelService.buscaLivroDisponivelPorId(livroUsuarioAlteracao.livro);
        } else {
            livro = await this.livroService.buscaLivroPorId(livroUsuarioAlteracao.livro);
        }

        const usuario = await this.usuarioService.buscaUsuarioPorNome(livroUsuarioAlteracao.usuario);
        
        livroUsuarioBanco.livro = livro;
        livroUsuarioBanco.usuario = usuario;
        livroUsuarioBanco.dataInicioLeitura = dataInicioLeitura;
        livroUsuarioBanco.dataFimLeitura = dataFimLeitura;
        
        return this.livroUsuarioRepository.save(livroUsuarioBanco);        
    }

    public async removeLivroUsuario(idLivroUsuario: number): Promise<void> {
        const livroUsuarioBanco = await this.buscaLivroUsuarioPorId(idLivroUsuario);

        await this.livroUsuarioRepository.delete(idLivroUsuario);
    }
}