import { Request, Response, NextFunction } from "express";
import { CustomerService } from "./customer.service";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

export class CustomerController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const customers = await CustomerService.findAll();

      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      res.json(customer);

    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findEagerlyById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;

      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomersWithOrdersByNameSearch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const nameSearch = String(req.params.name_search);
      const customers = await CustomerService.findCustomerWithOrdersByNameSearch(nameSearch);

      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, name } = req.body;

      if (!email || !name === undefined) {
        res.status(400).json({
          message: "brandId, model and price are mandatory",
        });
        return;
      }

      const customer = await CustomerService.create({
        email,
        name
      });

      res.status(201).json(customer);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      const updatedCustomer = await CustomerService.update(
        customer,
        req.body
      );

      res.json(updatedCustomer);

    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const customer = await CustomerService.findById(id);

      if (!customer) {
        res.status(404).json({
          message: "Customer not found",
        });

        return;
      }

      await CustomerService.delete(customer);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}