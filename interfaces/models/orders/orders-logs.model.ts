import { IUsers } from "../users/users.model";
import { IOrders } from "./orders.model";

/**
 * 
 * Interface: OrdersLogs
 * 
 */

export interface IOrdersLogs {
    id: number;
    user: IUsers;
    order: IOrders;
    content: string;
}
