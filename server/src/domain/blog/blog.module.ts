import { DynamicModule, Module } from "@nestjs/common";
import { provideEntity } from "src/libs/database";
import { provideClass } from "src/shared";
import { BLOG_REPOSITORY, BLOG_SERVICE } from "./consts";
import { Blog } from "./entities";
import { BlogService } from "./services/blog.service";

@Module({})
export class BlogModule {
  static getProviders() {
    return [
      provideEntity(BLOG_REPOSITORY, Blog),
      provideClass(BLOG_SERVICE, BlogService),
    ];
  }
  static imports() {
    return [];
  }
  static forRoot(): DynamicModule {
    return {
      module: BlogModule,
      providers: this.getProviders(),
      imports: this.imports(),
    };
  }
  static forFeature(): DynamicModule {
    return {
      module: BlogModule,
      providers: this.getProviders(),
      imports: this.imports(),
      exports: [],
    };
  }
}
