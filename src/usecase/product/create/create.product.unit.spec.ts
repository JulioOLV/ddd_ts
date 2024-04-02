import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const repository = MockRepository();
    const useCase = new CreateProductUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is empty", async () => {
    const repository = MockRepository();
    const useCase = new CreateProductUseCase(repository);

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is invalid", async () => {
    const repository = MockRepository();
    const useCase = new CreateProductUseCase(repository);

    input.name = "Product 1";
    input.price = -1;

    await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});