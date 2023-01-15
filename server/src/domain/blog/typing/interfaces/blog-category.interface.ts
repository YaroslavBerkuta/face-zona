import { IBlog } from "./blog.intrface";

export class IBlogCategory {
  id: number;
  name: string;
  blog?: IBlog[];
  createdAt: string;
  updatedAt: string;
}
