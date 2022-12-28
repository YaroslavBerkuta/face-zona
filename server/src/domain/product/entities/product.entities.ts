import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  title: string;
  @Column({ type: "varchar", nullable: false })
  price: string;
  @Column()
  salePrice: string;
  @Column()
  mainImg: string;
  @Column()
  brand: string;
  @Column()
  productType: string;
  @Column()
  features: string;
  @Column({ type: "text" })
  advice: string;
  @Column()
  response: string;
  @Column("varchar", { array: true, default: [] })
  components: string | string[];
  @Column({ type: "text" })
  application: string;
  @Column({ type: "text" })
  producer: string;
  @Column({ type: "text" })
  effect: string;

  @CreateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  createdAt: string;
  @UpdateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  updatedAt: string;
}
