import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutorModule } from './autor/autor.module';
import { LivroUsuarioModule } from './livro-usuario/livro-usuario.module';
import { Livro } from './livro/livro.entity';
import { LivroModule } from './livro/livro.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    LivroModule,
    UsuarioModule,
    AutorModule,
    LivroUsuarioModule,
    ConfigModule.forRoot(),
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BANCO_DADOS,
      port: parseInt(process.env.PORTA_BANCO_DADOS, 10),
      username: process.env.USUARIO_BANCO_DADOS,
      password: process.env.SENHA_BANCO_DADOS,
      database: process.env.NOME_BANCO_DADOS,
      entities: [Livro],
      synchronize: true,  // synchronize não deve ser usado em PRODUÇÃO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
