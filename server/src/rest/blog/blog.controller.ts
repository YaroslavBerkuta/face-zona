import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IPagination, ReqPagination } from "src/shared";
import { RestBlogService } from "./blog.service";

@ApiTags("Blog")
@Controller("blog")
export class RestBlogController {
  constructor(private readonly blogService: RestBlogService) {}

  @Get("list")
  public getList(
    @ReqPagination() pagination: IPagination,
    @Query("category") category: number
  ) {
    return this.blogService.getList(pagination, category);
  }

  @Get("last")
  public getNew() {
    return this.blogService.genNew();
  }

  @Get("category")
  public getCategory() {
    return this.blogService.getCategory();
  }

  @Get("popular")
  public getPopular() {
    return this.blogService.getPopular();
  }
}
