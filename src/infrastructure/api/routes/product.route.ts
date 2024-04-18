import type { Request, Response } from "express";
import * as express from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const input: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);

    res.status(200).send(output);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

productRoute.get("/", async (_: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});

    res.status(200).send(output);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
