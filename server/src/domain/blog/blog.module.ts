import { DynamicModule, Module } from "@nestjs/common";
import { provideEntity } from "src/libs/database";
import { provideClass } from "src/shared";
import {
  BLOG_CATEGORY_REPOSITORY,
  BLOG_CATEGORY_SERVICE,
  BLOG_REPOSITORY,
  BLOG_SERVICE,
} from "./consts";
import { Blog, BlogCategory } from "./entities";
import { BlogCategoryService } from "./services/blog-category.service";
import { BlogService } from "./services/blog.service";

@Module({})
export class BlogModule {
  static getProviders() {
    return [
      provideEntity(BLOG_REPOSITORY, Blog),
      provideEntity(BLOG_CATEGORY_REPOSITORY, BlogCategory),
      provideClass(BLOG_CATEGORY_SERVICE, BlogCategoryService),
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
      exports: [BLOG_CATEGORY_SERVICE, BLOG_SERVICE, BLOG_REPOSITORY,BLOG_CATEGORY_REPOSITORY],
    };
  }
}
