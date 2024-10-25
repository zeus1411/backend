import { IPictures } from "../products/images.model";
import { IProducts } from "../products/product.model";
import { IAddress } from "../users/address.model";
import { IUsers } from "../users/users.model";
import { IWebsites } from "../website.model";

/**
 * 
 * Interface: IOrders
 * 
 */

export enum PaymentStatus {
    PAID = 1,
    UNPAID = 0
}

export enum DeliveryStatus {
    PROCUCESS = 0,
    SHIPPED = 1,
    DELIVERED = 2,
}

export interface IOrders {
    id: number;

    user: IUsers;
    addresses: IAddress;
    images: string[];

    products: object[];
    orderCode: number;
    deposit: number;
    orderPrice: number;
    shipPrice: number;
    discountPrice: number;

    deliveryMethod: string;
    deliveryStatus: DeliveryStatus;
    paymentMethod: string;
    paymentStatus: PaymentStatus;

    website: IWebsites;

    /**
     * Cập nhật trạng thái vận chuyển đơn hàng
     * 
     * @param status Trạng thái của đơn hàng
     *  
     */
    setDeliveryStatus(status: DeliveryStatus): void;

    /**
     * Cập nhật trạng thái thanh toán
     * 
     * @param status Trạng thái thanh toán
     */
    setPaymentStatus(status: PaymentStatus): void;

    /**
     * Thêm hình ảnh review của sản phẩm
     * 
     * @param images danh sách hình ảnh 
     */
    addReviewImage(images: string[]): void;
}