import { Injectable, Inject } from "@nestjs/common";
import {
  BLOG_CATEGORY_REPOSITORY,
  BLOG_REPOSITORY,
  BLOG_SERVICE,
} from "src/domain/blog/consts";
import {
  IBlogCategoryRepository,
  IBlogRepository,
} from "src/domain/blog/typing/interfaces";
import {
  IPagination,
  paginateAndGetMany,
  prepareSearchString,
  ReqPagination,
  transformFileUrl,
} from "src/shared";
import { Brackets } from "typeorm";

@Injectable()
export class RestBlogService {
  @Inject(BLOG_REPOSITORY) private readonly blogRepository: IBlogRepository;
  @Inject(BLOG_CATEGORY_REPOSITORY)
  private readonly blogCategoryRepository: IBlogCategoryRepository;

  public async getList(pagination: IPagination, category: number) {
    const query = await this.blogRepository
      .createQueryBuilder("it")
      .leftJoinAndSelect("it.category", "itc")
      .orderBy("it.createdAt", "DESC");
    if (category) {
      query.where("itc.id = :category", { category });
    }
    if (pagination.searchString) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where("it.title ILIKE :searchString", {
            searchString: prepareSearchString(pagination.searchString),
          })
            .orWhere("it.shortDescription ILIKE :searchString")
            .orWhere("it.content ILIKE :searchString");
        })
      );
    }

    const { items, count } = await paginateAndGetMany(query, pagination, "it");
    // items.map((it, i) => {
    //   if (it.coverImg) items[i].coverImg = transformFileUrl(it.coverImg);
    // });

    return { items, count };
  }

  public async genNew() {
    return await this.blogRepository.findOne({
      order: {
        createdAt: "DESC",
      },
      join: {
        alias: "blogs",
        leftJoinAndSelect: {
          blogCategoryes: "blogs.category",
        },
      },
    });
  }

  public async getCategory() {
    return await this.blogCategoryRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  public async getPopular() {
    return await this.blogRepository.find({
      order: {
        view: "DESC",
      },
      take: 15,
    });
  }
}
