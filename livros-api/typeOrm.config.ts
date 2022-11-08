import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('HOST_BANCO_DADOS'),
  port: configService.get('PORTA_BANCO_DADOS'),
  username: configService.get('USUARIO_BANCO_DADOS'),
  password: configService.get('SENHA_BANCO_DADOS'),
  database: configService.get('NOME_BANCO_DADOS'),
  entities: [],
});