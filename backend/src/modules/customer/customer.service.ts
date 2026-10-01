import { Customer } from "./customer.model";
import { Op } from "sequelize";
import { Order } from "../order/order.model";

export class CustomerService {

  static async findAll() {
    return Customer.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Customer.findByPk(id);
  }

  static async findCustomerWithOrdersByNameSearch(nameSearch: string){
    return Customer.findAll({
      where: {name: { [Op.like]: `%{nameSearch}%`}},
      include: [{ model: Order, as: "orders", required: true}]
    })
  }

  static async findEagerlyById(id: number) {
    return Customer.findByPk(id, {
      include: [
        {
          model: Customer,
          as: 'customer'
        }
      ]
    });
  }


  static async create(data: {
    email: string,
    name: string;
  }) {
    return Customer.create(data);
  }


  static async update(
    customer: Customer,
    data: {
      email: string,
      name: string;
    }
  ) {
    return customer.update(data);
  }


  static async delete(customer: Customer) {
    await customer.destroy();
  }
}