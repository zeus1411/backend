import { IOrdersLogs } from "@interfaces/models/orders/orders-logs.model";
import { IOrdersLogsService } from "@interfaces/services/orders/orders-logs.service";
import { OrdersLogs } from "@src/models/orders/orders-logs.model";
import { Orders } from "@src/models/orders/orders.model";
import { Users } from "@src/models/users/users.model";
import OrdersLogsDB from "@src/services/database/orders/orders-logs.database";
import OrdersDB from "@src/services/database/orders/orders.database";
import UserDB from "@src/services/database/users/users.database";
import { dateFormat } from "@src/utils/date-format";
import { plainToInstance } from "class-transformer";

export class OrdersLogsService implements IOrdersLogsService {
    include: any;

    constructor() {
        this.include = [
            { model: UserDB, as: 'userInfo' },
            { model: OrdersDB, as: 'orderInfo' }
        ]
    }

    async get(id: number): Promise<IOrdersLogs> {
        const log = await OrdersLogsDB.findByPk(id, { include: this.include });
        if (!log) throw new Error("Log not found");
        return this.plainToOrders(log);
    }

    async getAll(): Promise<IOrdersLogs[]> {
        const logs = await OrdersLogsDB.findAll({ include: this.include });
        return logs.map((log: OrdersLogsDB) => this.plainToOrders(log));
    }

    async create(item: IOrdersLogs): Promise<IOrdersLogs> {
        this.foreignChecking(item);
        const log = await OrdersLogsDB.create({
            ...item,
            user: item.user.id,
            order: item.order.id
        });
        return this.get(log.id);
    }
    async update(item: IOrdersLogs): Promise<IOrdersLogs> {
        this.foreignChecking(item);
        const log = await OrdersLogsDB.findByPk(item.id, { include: this.include });
        if (!log) throw new Error("Log not found");
        log.set({ ...item, user: item.user.id, order: item.order.id });
        await log.save();
        return this.get(log.id);
    }

    async delete(item: IOrdersLogs): Promise<boolean> {
        const log = await OrdersLogsDB.findByPk(item.id, { include: this.include });
        if (!log) throw new Error("Log not found");

        const result = await OrdersLogsDB.destroy({ where: { id: item.id } });
        return result > 0;
    }

    foreignChecking(item: IOrdersLogs) {
        if (!item.user) throw new Error("User not found");
        if (!item.order) throw new Error("Orders not found");
    }

    plainToOrders(item: OrdersLogsDB): IOrdersLogs {
        const data = item.dataValues;
        const logs = plainToInstance(OrdersLogs, dateFormat(data));

        logs.order = plainToInstance(Orders, data?.orderInfo?.dataValues);
        logs.user = plainToInstance(Users, data?.userInfo?.dataValues);
        return logs;
    }

}