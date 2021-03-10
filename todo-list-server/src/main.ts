import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
        },
    });

    app.setGlobalPrefix('api');

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            validationError: { target: false, value: true },
        }),
    );

    await app.listen(3000);
}

void bootstrap();
