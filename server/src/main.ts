import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as basicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DomainExceptionsFilter } from "./shared";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { excludeExtraneousValues: true },
    })
  );

  app.enableCors({
    origin: "*",
  });

  app.useGlobalFilters(new DomainExceptionsFilter(new Logger()));

  app.use(
    "/docs",
    basicAuth({
      challenge: true,
      users: {
        admin: "admin",
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Saltycoin Api")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(5000);
}
bootstrap();
