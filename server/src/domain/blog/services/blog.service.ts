import { Inject, Injectable } from "@nestjs/common";
import { BLOG_REPOSITORY } from "../consts";
import { IBlogRepository } from "../typing/interfaces";
import { IBlogService, IStoreBlogPayload } from "../typing/interfaces";

@Injectable()
export class BlogService implements IBlogService {
  @Inject(BLOG_REPOSITORY) private readonly blogRepository: IBlogRepository;

  public async store(payload: IStoreBlogPayload) {
    return await this.blogRepository.save({
      title: payload.title,
      categoryId: payload.categoryId,
      content: payload.content,
      shortDescription:payload.shortDescription
    });
  }
}
