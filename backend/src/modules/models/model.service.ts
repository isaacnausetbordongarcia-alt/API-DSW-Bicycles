import { Model } from "./model.model.js";

export class ModelService {

    static async findAll() {
        return Model.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Model.findByPk(id);
    }


    static async findEagerlyById(id: number) {
        return Model.findByPk(id, {
            include: [
                {
                    model: Model,
                    as: 'model'
                }
            ]
        });
    }

    static async create(data: {
        name: string;
    }) {
        return Model.create(data);
    }


    static async update(
        model: Model,
        data: {
            name: string;
        }
    ) {
        return model.update(data);
    }


    static async delete(model: Model) {
        await model.destroy();
    }
}