import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product1 = new Product("123", "Test 1", 100);
    const product2 = new Product("321", "Test 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await useCase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[1].id).toEqual(product2.id);
  });
});