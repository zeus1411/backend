import { IOrdersLogs } from "@interfaces/models/orders/orders-logs.model";
import { IOrders } from "@interfaces/models/orders/orders.model";
import { IUsers } from "@interfaces/models/users/users.model";

export class OrdersLogs implements IOrdersLogs {
    id: number;
    user: IUsers;
    order: IOrders;
    content: string;
}

export class OrdersLogsBuilder {
    private order: OrdersLogs;

    private constructor() {
        this.order = new OrdersLogs();
    }

    setUser(user: IUsers) {
        this.order.user = user;
        return this;
    }

    setOrder(order: IOrders) {
        this.order.order = order;
        return this;
    }

    setContent(content: string) {
        this.order.content = content;
        return this;
    }

    static new() { return new OrdersLogsBuilder(); }
    build() { return this.order; }
}