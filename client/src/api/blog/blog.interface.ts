export interface GetPost {
  id: number;
  coverImg: string;
  categoryId: number;
  category: GetPostCategory;
  title: string;
  shortDescription: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetPostList {
  count: number;
  items: GetPost[];
}

export interface GetPostCategory {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type GetPostPopular = GetPost;
