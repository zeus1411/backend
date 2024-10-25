import { IOrders } from "@interfaces/models/orders/orders.model";
import { IProducts } from "@interfaces/models/products/product.model";
import { IOrdersService } from "@interfaces/services/orders/orders.service";
import { Orders } from "@src/models/orders/orders.model";
import { Products } from "@src/models/products/product.model";
import { Address } from "@src/models/users/address.model";
import { Users } from "@src/models/users/users.model";
import { Website } from "@src/models/website.model";
import OrdersDB from "@src/services/database/orders/orders.database";
import ProductsDB from "@src/services/database/products/product.database";
import AddressesDB from "@src/services/database/users/address.database";
import UserDB from "@src/services/database/users/users.database";
import WebsiteDB from "@src/services/database/websites.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class OrdersService implements IOrdersService {
    include: any;

    constructor() {
        this.include = [
            { model: UserDB, as: 'userInfo' },
            { model: AddressesDB, as: 'addressInfo' },
            { model: WebsiteDB, as: 'websiteInfo' },
        ]
    }

    async get(id: number): Promise<IOrders> {
        const order = await OrdersDB.findByPk(id, { include: this.include });
        if (!order) throw new Error("Order not found");
        return this.plainToOrders(order);
    }

    async getAll(): Promise<IOrders[]> {
        const orders = await OrdersDB.findAll({ include: this.include });
        return orders.map((order: OrdersDB) => this.plainToOrders(order));
    }

    async create(item: IOrders): Promise<IOrders> {
        this.foreignChecking(item);
        const order = await OrdersDB.create({
            ...item,
            user: item.user.id,
            addresses: item.addresses.id,
            website: item.website.id
        });
        return this.get(order.id);
    }

    async update(item: IOrders): Promise<IOrders> {
        this.foreignChecking(item);
        const order = await OrdersDB.findByPk(item.id);
        if (!order) throw new Error("Order not found");
        order.set({
            ...item,
            user: item.user.id,
            addresses: item.addresses.id,
            website: item.website.id
        });
        await order.save();
        return this.get(order.id);
    }

    async delete(item: IOrders): Promise<boolean> {
        const order = await OrdersDB.findByPk(item.id);
        if (!order) throw new Error("Order not found");
        const query = await OrdersDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

    foreignChecking(item: IOrders) {
        if (!item.user) throw new Error("User not found");
        if (!item.addresses) throw new Error("Addresses not found");
        if (!item.website) throw new Error("Website not found");
    }

    plainToOrders(item: OrdersDB): IOrders {
        const data = item.dataValues;
        const order = plainToInstance(Orders, dateFormat(data));
        order.user = plainToInstance(Users, data?.userInfo?.dataValues);
        order.addresses = plainToInstance(Address, data?.addressInfo?.dataValues);
        order.website = plainToInstance(Website, data?.websiteInfo?.dataValues);

        return order;
    }

}