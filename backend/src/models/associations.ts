import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model.js";
import { Customer } from "../modules/customer/customer.model.js";
import { Order } from "../modules/order/order.model.js";
import { OrderItem } from "../modules/order-item/order-item.model.js";
import { Model } from "../modules/models/model.model.js";


export function defineAssociations() {
    Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
    
    Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });

    Bicycle.hasOne(BicycleDetail, { foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE" });

    BicycleDetail.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });

    Customer.hasMany(Order, {foreignKey: "customerId", as: "orders"});

    Order.belongsTo(Customer, {foreignKey: "customerId", as: "customer"});

    Order.hasMany(OrderItem, {foreignKey: "orderId", as: "items"});

    OrderItem.belongsTo(Order, {foreignKey: "orderId", as: "order"});

    Bicycle.hasMany(OrderItem, {foreignKey: "bicycleId", as: "orderItems"});

    OrderItem.belongsTo(Bicycle, {foreignKey: "bicycleId", as: "bicycle"});

    Order.belongsToMany(Bicycle, {through: OrderItem, foreignKey: "orderId", otherKey: "bicycleId", as: "bicycles",});

    Bicycle.belongsToMany(Order, {through: OrderItem, foreignKey: "bicycleId", otherKey: "orderId", as: "orders",});

    Model.hasMany(Bicycle, {foreignKey: "modelId", as: "bicycles"});

    Bicycle.belongsTo(Model, {foreignKey: "modelId", as: "model"});

}