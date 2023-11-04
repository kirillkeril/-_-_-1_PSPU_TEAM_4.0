import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "dotenv/config";
import * as process from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  console.log(process.env.JWT_ISSUER, process.env.MONGO_DB_CONNECTION);
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });

  // Add swagger
  const config = new DocumentBuilder().setTitle("Template").build();
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, documentation);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}`),
  );
}
bootstrap();
