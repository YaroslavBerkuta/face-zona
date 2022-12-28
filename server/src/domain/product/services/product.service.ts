import { Injectable, Inject } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "../consts";

@Injectable()
export class ProductService {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepository;

  public async store(payload) {
    const product = await this.productRepository.save({
      title: payload.title,
      price: payload.price,
      brand: payload.brand,
      productType: payload.productType,
      features: payload.features,
      advice: payload.advice,
      response: payload.response,
      components: payload.components,
      application: payload.application,
      producer: payload.producer,
      effect: payload.effect,
    });
    return product;
  }
}
