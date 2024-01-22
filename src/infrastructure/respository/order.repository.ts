import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
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

      let itemsQuantity = entity.items.length - 1;
      while (itemsQuantity > -1) {
        await OrderItemModel.create(
          {
            id: entity.items[itemsQuantity].id,
            name: entity.items[itemsQuantity].name,
            price: entity.items[itemsQuantity].price,
            product_id: entity.items[itemsQuantity].productId,
            quantity: entity.items[itemsQuantity].quantity,
            order_id: entity.id,
          },
          { transaction }
        );
        itemsQuantity -= 1;
      }
      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [OrderItemModel],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(
      (item: OrderItemModel) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    const order = new Order(orderModel.id, orderModel.customer_id, orderItems);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: [OrderItemModel] });

    const orders = ordersModel.map((order: OrderModel) => {
      const orderItems = order.items.map(
        (item: OrderItemModel) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );
      return new Order(order.id, order.customer_id, orderItems);
    });

    return orders;
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
