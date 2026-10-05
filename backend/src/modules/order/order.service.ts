import { Order } from "./order.model";
import { Customer } from "../customer/customer.model";

export class OrderService {

  static async findAll() {
    return Order.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return Order.findByPk(id);
  }

  static async findEagerlyById(id: number) {
    return Order.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'order'
        }
      ]
    });
  }

  static async findByCustomerId(customerId: number){
    return Order.findAll({
      where: { customerId },
      include: [{ model: Customer, as: "customer", attributes: ["id", "name", "email"]}],
      order: [["orderDate", "DESC"]],
    })
  }

  static async create(data: {
    customerId: number,
    status: "pending" | "paid" | "shipped" | "cancelled",
  }) {
    return Order.create(data);
  }


  static async update(
    order: Order,
    data: {
      customerId: number,
      status: "pending" | "paid" | "shipped" | "cancelled",
    }
  ) {
    return order.update(data);
  }

  static async delete(order: Order) {
    await order.destroy();
  }
}