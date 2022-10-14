import { NestFactory } from '@nestjs/core';
import { log } from 'console';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
// Fonte: https://stackoverflow.com/questions/55093055/logging-request-response-in-nest-js
//        https://www.npmjs.com/package/morgan

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

  await app.listen(process.env.PORTA_API, '0.0.0.0');
}

if (isNaN(parseInt(process.env.PORTA_API))) {
  log('Não foi informado "PORTA_API" em .env');
  process.exit(1);
}

bootstrap().then(() => {
  log(`API rodando em porta ${process.env.PORTA_API}`)
});
