import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Autor } from "./autor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Autor])],
    controllers: [

    ],
    providers: [

    ]
})
export class AutorModule {}