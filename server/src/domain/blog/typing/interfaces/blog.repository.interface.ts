import { Repository } from "typeorm";
import { IBlogCategory } from "./blog-category.interface";
import { IBlog } from "./blog.intrface";

export type IBlogRepository = Repository<IBlog>;
export type IBlogCategoryRepository = Repository<IBlogCategory>;
