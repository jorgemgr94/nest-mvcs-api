import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI')
      }),
			inject: [ConfigService]
		}),
		PetsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
