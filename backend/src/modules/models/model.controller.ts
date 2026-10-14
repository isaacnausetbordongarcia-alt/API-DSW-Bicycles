import { Request, Response, NextFunction } from "express";
import { ModelService } from "./model.service.js";

export class ModelController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const models = await ModelService.findAll();

            res.json(models);
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

            const model = await ModelService.findById(id);

            if (!model) {
                res.status(404).json({
                    message: "Model not found",
                });

                return;
            }

            res.json(model);

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

            const model = await ModelService.findEagerlyById(id);

            if (!model) {
                res.status(404).json({
                    message: "Model not found",
                });

                return;

            }
            res.json(model);
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
            const { name } = req.body;

            if (!name === undefined) {
                res.status(400).json({
                    message: "email and name are mandatory",
                });
                return;
            }

            const model = await ModelService.create({
                name
            });

            res.status(201).json(model);

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

            const model = await ModelService.findById(id);

            if (!model) {
                res.status(404).json({
                    message: "Model not found",
                });

                return;
            }

            const updatedModel = await ModelService.update(
                model,
                req.body
            );

            res.json(updatedModel);

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

            const model = await ModelService.findById(id);

            if (!model) {
                res.status(404).json({
                    message: "Model not found",
                });

                return;
            }

            await ModelService.delete(model);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}