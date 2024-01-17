import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/respository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { sequelizeInstance } from "./create-instance";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    const transaction = await sequelizeInstance.transaction();

    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
          transaction,
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });

      let itemsQuantity = entity.items.length;
      while (itemsQuantity === 0) {
        await OrderItemModel.create(
          {
            id: entity.items[itemsQuantity].id,
            name: entity.items[itemsQuantity].name,
            price: entity.items[itemsQuantity].price,
            product_id: entity.items[itemsQuantity].productId,
            quantity: entity.items[itemsQuantity].quantity,
          },
          { transaction }
        );
        itemsQuantity -= 1;
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }

  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
