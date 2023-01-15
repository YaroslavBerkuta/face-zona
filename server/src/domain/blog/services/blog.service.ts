import { Inject, Injectable } from "@nestjs/common";
import { BLOG_REPOSITORY } from "../consts";
import { IBlogRepository } from "../typing/interfaces";

@Injectable()
export class BlogService {
  @Inject(BLOG_REPOSITORY) private readonly blogRepository: IBlogRepository;
}
