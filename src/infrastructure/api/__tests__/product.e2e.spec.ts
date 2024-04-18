import request = require("supertest");
import { app, sequelize } from "../express";

describe("E2E product tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product with success", async () => {
    const result = await request(app).post("/product").send({
      name: "Test",
      price: 10,
    });

    expect(result.statusCode).toBe(200);
    expect(result.body.name).toBe("Test");
    expect(result.body.price).toBe(10);
  });

  it("should return status code 500", async () => {
    const result = await request(app).post("/product").send({
      name: "Test",
    });

    expect(result.statusCode).toBe(500);
  });

  it("should return a list of product", async () => {
    const product1 = await request(app).post("/product").send({
      name: "Test",
      price: 10,
    });

    expect(product1.statusCode).toBe(200);

    const product2 = await request(app).post("/product").send({
      name: "Test 2",
      price: 20,
    });

    expect(product2.statusCode).toBe(200);

    const result = await request(app).get("/product").send();
    expect(result.statusCode).toBe(200);
    expect(result.body.products).toHaveLength(2);

    const prod1 = result.body.products[0];
    expect(prod1.name).toBe("Test");
    expect(prod1.price).toBe(10);

    const prod2 = result.body.products[1];
    expect(prod2.name).toBe("Test 2");
    expect(prod2.price).toBe(20);
  });
});
