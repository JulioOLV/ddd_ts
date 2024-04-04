import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(_: InputListProductDto): Promise<OutputListProductDto> {
    const productList = await this.productRepository.findAll();

    return OutputMapper.toOutput(productList);
  }
}

class OutputMapper {
  static toOutput(productList: Product[]): OutputListProductDto {
    return {
      products: productList.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }))
    };
  }
}