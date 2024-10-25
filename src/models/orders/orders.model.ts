import { OrdersService } from "@src/services/services/orders/orders.service";
import { DeliveryStatus, IOrders, PaymentStatus } from "interfaces/models/orders/orders.model";
import { IAddress } from "interfaces/models/users/address.model";
import { IUsers } from "interfaces/models/users/users.model";
import { IWebsites } from "interfaces/models/website.model";

export class Orders implements IOrders {
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

    async setDeliveryStatus(status: DeliveryStatus): Promise<void> {
        const ordersService = new OrdersService();
        this.deliveryStatus = status;
        await ordersService.update(this);
        // throw new Error("Method not implemented.");
    }
  
    async setPaymentStatus(status: PaymentStatus): Promise<void> {
        // throw new Error("Method not implemented.");
        const ordersService = new OrdersService();
        this.paymentStatus = status;
        await ordersService.update(this);
      
    }
    addReviewImage(images: string[]): void {
        throw new Error("Method not implemented.");
    }
}

export class OrdersBuilder {
    private order: IOrders;

    private constructor() {
        this.order = new Orders();
    }

    static new() {
        return new OrdersBuilder();
    }

    public setUser(user: IUsers) {
        this.order.user = user;
        return this;
    }
    public setAddress(address: IAddress) {
        this.order.addresses = address;
        return this;
    }
    public setImages(images: string[]) {
        this.order.images = images;
        return this;
    }
    public setProducts(products: object[]) {
        this.order.products = products;
        return this;
    }
    public setOrderCode(orderCode: number) {
        this.order.orderCode = orderCode;
        return this;
    }
    public setDeposit(deposit: number) {
        this.order.deposit = deposit;
        return this;
    }
    public setOrderPrice(orderPrice: number) {
        this.order.orderPrice = orderPrice;
        return this;
    }
    public setShipPrice(shipPrice: number) {
        this.order.shipPrice = shipPrice;
        return this;
    }
    public setDiscountPrice(discountPrice: number) {
        this.order.discountPrice = discountPrice;
        return this;
    }
    public setDeliveryMethod(deliveryMethod: string) {
        this.order.deliveryMethod = deliveryMethod;
        return this;
    }
    public setDeliveryStatus(deliveryStatus: DeliveryStatus) {
        this.order.deliveryStatus = deliveryStatus;
        return this;
    }
    public setPaymentMethod(paymentMethod: string) {
        this.order.paymentMethod = paymentMethod;
        return this;
    }
    public setPaymentStatus(paymentStatus: PaymentStatus) {
        this.order.paymentStatus = paymentStatus;
        return this;
    }
    public setWebsite(website: IWebsites) {
        this.order.website = website;
        return this;
    }

    public build() {
        return this.order;
    }
}