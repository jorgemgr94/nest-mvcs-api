import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const logger = new Logger('main');

	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const PORT = configService.get<number>('PORT');

	if (!PORT) throw Error(`PORT not specified`);

	await app.listen(PORT);
	logger.debug(`App started in PORT - ${PORT}`);
}

void bootstrap();
