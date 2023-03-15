import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Autor } from './autor/autor.entity';
import { AutorModule } from './autor/autor.module';
import { LivroDisponivelModule } from './livro-disponivel/livro-disponivel.module';
import { LivroUsuario } from './livro-usuario/livro-usuario.entity';
import { LivroUsuarioModule } from './livro-usuario/livro-usuario.module';
import { Livro } from './livro/livro.entity';
import { LivroModule } from './livro/livro.module';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    LivroModule,
    UsuarioModule,
    AutorModule,
    LivroUsuarioModule,
    AuthModule,
    LivroDisponivelModule,
    ConfigModule.forRoot(),
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BANCO_DADOS,
      port: parseInt(process.env.PORTA_BANCO_DADOS, 10),
      username: process.env.USUARIO_BANCO_DADOS,
      password: process.env.SENHA_BANCO_DADOS,
      database: process.env.NOME_BANCO_DADOS,
      entities: [
        Autor,
        Usuario,
        Livro,
        LivroUsuario
      ],
      synchronize: false,  // synchronize não deve ser usado em PRODUÇÃO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
