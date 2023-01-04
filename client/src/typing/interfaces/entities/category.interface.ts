import { Status } from "../../enums";

export interface ICategoryTranslate {
  id?: number;
  name: string;
  description?: string;
  categoryId?: number;
}

export interface ICategory {
  id: number;
  status: Status;
  parentId: number;
  key: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  translates?: ICategoryTranslate[];
}
