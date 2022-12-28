import { DynamicModule, Module } from "@nestjs/common";
import { provideEntity } from "src/libs/database";
import { provideClass } from "src/shared";
import { PRODUCT_REPOSITORY, PRODUCT_SERVICE } from "./consts";
import { Product } from "./entities";
import { PRODUCT_SEEDS } from "./seedes";
import { ProductService, PRODUCT_SERVICES } from "./services";

@Module({})
export class ProductModule {
  static getProviders() {
    return [
      provideEntity(PRODUCT_REPOSITORY, Product),
      provideClass(PRODUCT_SERVICE, ProductService),
      ...PRODUCT_SERVICES,
      ...PRODUCT_SEEDS,
    ];
  }
  static forRoot(): DynamicModule {
    return {
      module: ProductModule,
      providers: this.getProviders(),
      imports: [],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: ProductModule,
      providers: this.getProviders(),
      imports: [],
      exports: [PRODUCT_REPOSITORY, PRODUCT_SERVICE],
    };
  }
}
