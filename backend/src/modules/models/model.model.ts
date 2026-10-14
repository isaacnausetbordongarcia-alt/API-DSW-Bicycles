import {
    Model as SequelizeModel,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export class Model extends SequelizeModel<
    InferAttributes<Model>,
    InferCreationAttributes<Model>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;
}

Model.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        createdAt: DataTypes.DATE,

        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,

        tableName: "models",

        modelName: "model",

        timestamps: true,
    }
);