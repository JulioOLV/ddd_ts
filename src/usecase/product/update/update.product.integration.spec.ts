import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test update product use case", () => {
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
    await sequelize.sync();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Test 1", 100);
    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Test edited",
      price: 12,
    };

    const output = await useCase.execute(input);

    const productList = await productRepository.findAll();

    expect(output.id).toEqual(productList[0].id);
    expect(output.name).toEqual(productList[0].name);
    expect(output.price).toEqual(productList[0].price);
  });
});