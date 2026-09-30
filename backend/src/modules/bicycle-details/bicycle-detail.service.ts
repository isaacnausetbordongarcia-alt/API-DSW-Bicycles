import { Brand } from "./details.model";

export class BrandService {

    static async findAll() {
        return Brand.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Brand.findByPk(id);
    }


    static async create(data: {
        brandId: number,
        name: string;
    }) {
        return Brand.create(data);
    }


    static async update(
        brand: Brand,
        data: {
            brandId: number,
            name: string;
        }
    ) {
        return brand.update(data);
    }


    static async delete(brand: Brand) {
        await brand.destroy();
    }
}