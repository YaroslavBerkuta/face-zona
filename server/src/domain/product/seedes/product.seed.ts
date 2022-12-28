import { Injectable } from "@nestjs/common";
import { Seeder } from "src/shared";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductSeed extends Seeder {
  protected name = "Admin user";

  constructor(private readonly productService: ProductService) {
    super();
  }
  protected async seed(): Promise<void> {
    console.log("SEED START");

    const product = await this.productService.store({
      title: "test title",
      price: "2000",
      brand: "test brand",
      productType: "test producttype",
      features: "test features",
      advice: "test advice",
      response: "test.response",
      components: ["test.components", "test.component2", "test.component3"],
      application: "test.application",
      producer: "test.producer",
      effect: "test.effect",
    });
    console.log(product);
  }
}
