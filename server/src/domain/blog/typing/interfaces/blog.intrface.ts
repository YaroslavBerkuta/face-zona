import { IBlogCategory } from "./blog-category.interface";

export interface IBlog {
  id: number;
  coverImg: string;
  categoryId: number;
  title: string;
  shortDescription: string;
  content: string;
  view?: number;
  category?: IBlogCategory;
  createdAt?: string;
  updatedAt?: string;
}
