import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [

    ],
    providers: [

    ]
})
export class UsuarioModule {}