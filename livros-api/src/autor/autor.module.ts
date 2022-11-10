import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutorController } from "./autor.controller";
import { Autor } from "./autor.entity";
import { AutorService } from "./autor.service";

@Module({
    imports: [TypeOrmModule.forFeature([Autor])],
    controllers: [
        AutorController,
    ],
    providers: [
        AutorService,
    ]
})
export class AutorModule {}