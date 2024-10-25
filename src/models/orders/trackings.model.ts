import { ITrackings } from "@interfaces/models/orders/trackings.model";
import { Orders } from "./orders.model";
import { ITrackingType } from "@interfaces/models/orders/tracking-type.model";
import { TrackingService } from "@src/services/services/orders/tracking.service";


export class Tracking implements ITrackings {

    code: string;
    id: number;
    type: ITrackingType;
    order: Orders;
    inlandCode: string;
    content: string;

    async updateContent(): Promise<void> {
        const content = 'test';
        const trackingService = new TrackingService();
        this.content = content;
        await trackingService.update(this);
    }
}

export class TrackingBuilder {
    tracking: Tracking;

    private constructor() {
        this.tracking = new Tracking();
    }

    setType(type: ITrackingType): TrackingBuilder {
        this.tracking.type = type;
        return this;
    }

    setOrder(order: Orders): TrackingBuilder {
        this.tracking.order = order;
        return this;
    }

    setInlandCode(inlandCode: string): TrackingBuilder {
        this.tracking.inlandCode = inlandCode;
        return this;
    }

    setContent(content: string): TrackingBuilder {
        this.tracking.content = content;
        return this;
    }

    static new(): TrackingBuilder {
        return new TrackingBuilder();
    }

    build(): Tracking {
        return this.tracking;
    }
}