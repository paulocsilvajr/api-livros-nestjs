import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivroModule } from './livro/livro.module';

@Module({
  imports: [LivroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
