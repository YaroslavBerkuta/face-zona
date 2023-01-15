import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IBlogCategory } from "../typing/interfaces/blog-category.interface";
import { Blog } from "./blog.entity";

@Entity("blogCategoryes")
export class BlogCategory implements IBlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Blog, (blog) => blog.category)
  blog?: Blog[];

  @CreateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  updatedAt: string;
}
