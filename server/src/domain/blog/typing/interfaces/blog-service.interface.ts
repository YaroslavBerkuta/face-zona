import { IBlogCategory } from "./blog-category.interface";
import { IBlog } from "./blog.intrface";

export interface IBlogService {
  store(payload: IStoreBlogPayload): Promise<IBlog>;
}

export interface IBlogCategoryService {
  store(payload: IStoreBlogCategoryPayload): Promise<IBlogCategory>;
}

export interface IStoreBlogPayload {
  title: string;
  categoryId: number;
  content: string;
  shortDescription: string;
  coverImg?: string;
}

export interface IStoreBlogCategoryPayload {
  name: string;
}
