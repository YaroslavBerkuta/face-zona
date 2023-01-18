import { DynamicModule, Module } from "@nestjs/common";
import { BlogModule } from "src/domain/blog/blog.module";
import { RestBlogController } from "./blog.controller";
import { RestBlogService } from "./blog.service";

@Module({})
export class RestBlogModule {
  static forRoot(): DynamicModule {
    return {
      module: RestBlogModule,
      controllers: [RestBlogController],
      providers: [RestBlogService],
      imports: [BlogModule.forFeature()],
    };
  }
}
