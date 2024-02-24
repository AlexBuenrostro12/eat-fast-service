import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'Password1!', // user password
      database: 'eat-fast-dev', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    UserModule,
    AddressModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
