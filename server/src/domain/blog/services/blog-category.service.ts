import { Inject, Injectable } from "@nestjs/common";
import { BLOG_CATEGORY_REPOSITORY } from "../consts";
import {
  IBlogCategoryRepository,
  IBlogCategoryService,
  IStoreBlogCategoryPayload,
} from "../typing/interfaces";

@Injectable()
export class BlogCategoryService implements IBlogCategoryService {
  @Inject(BLOG_CATEGORY_REPOSITORY)
  private readonly blogCategoryRepository: IBlogCategoryRepository;

  public async store(payload: IStoreBlogCategoryPayload) {
    return await this.blogCategoryRepository.save({
      name: payload.name,
    });
  }
}
