import { IBlogCategory } from "./blog-category.interface";

export interface IBlog {
  id: number;
  coverImg: string;
  categoryId: number;
  title: string;
  content: string;
  category?: IBlogCategory;
  createdAt?: string;
  updatedAt?: string;
}
