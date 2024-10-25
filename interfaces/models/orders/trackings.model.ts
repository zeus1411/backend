import { IOrders } from "./orders.model";
import { ITrackingType } from "./tracking-type.model";

/**
 * 
 * Interface: OrdersLogs
 * 
 */

export interface ITrackings {
    id: number;
    order: IOrders;
    code: string;
    inlandCode: string;
    type: ITrackingType;
    content: string;

    /**
     * 
     * Thay đổi lịch sử vận chuyển của đơn hàng theo inlandCode type
     * 
     */
    updateContent(): Promise<void>;
}
