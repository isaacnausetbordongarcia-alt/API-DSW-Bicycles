import { Order } from "./order.model.js";
import { Customer } from "../customer/customer.model.js";
import { OrderItem } from "../order-item/order-item.model.js";
import { Bicycle } from "../bicycles/bicycle.model.js";
import { Op } from "sequelize";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model.js";


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

  static async findByBicycleCondition() {
    return Order.findAll({
      include: [{
        model: Bicycle,
        as: "bicycles",
        required: true,
        where: {
          price: { [Op.lt]: 100 },
        },
        through: { attributes: [] },
        include: [{
          model: BicycleDetail,
          as: "detail",
          required: true,
          where: {
            weight: { [Op.gt]: 20 },
          },
        }],
      }],
    });
  }

  static async findByCustomerId(customerId: number) {
    return Order.findAll({
      where: { customerId },
      include: [{ model: Customer, as: "customer", attributes: ["id", "name", "email"] }],
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