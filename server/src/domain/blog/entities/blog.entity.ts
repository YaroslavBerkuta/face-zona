import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IBlog } from "../typing/interfaces/blog.intrface";
import { BlogCategory } from "./blog-category.entity";

@Entity("blogs")
export class Blog implements IBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coverImg: string;

  @Column()
  view: number;

  @Column()
  categoryId: number;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  content: string;

  @ManyToOne(() => BlogCategory, (category) => category.blog)
  @JoinColumn({ name: "categoryId" })
  category?: BlogCategory;

  @CreateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  updatedAt: string;
}
