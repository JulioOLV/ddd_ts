import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("abc", "Product 1", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test product find use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    const input = {
      id: "abc",
    };

    const output = {
      id: "abc",
      name: "Product 1",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const useCase = new FindProductUseCase(repository);

    const input = {
      id: "abc",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});