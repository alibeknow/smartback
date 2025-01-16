import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateSwagger(app: INestApplication): void {
  const appConfig = new DocumentBuilder()
    .setTitle(`blockchain-app-bcc::`)

    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, appConfig);

  SwaggerModule.setup(`/swagger`, app, document);
}
