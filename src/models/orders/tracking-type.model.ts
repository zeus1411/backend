import { ITrackingType } from "@interfaces/models/orders/tracking-type.model";

export class TrackingType implements ITrackingType {
    id: number;
    name: string;
    code: string;
}


export class TrackingTypeBuilder {
    trackingType: TrackingType;

    private constructor() {
        this.trackingType = new TrackingType();
    }

    setName(name: string): TrackingTypeBuilder {
        this.trackingType.name = name;
        return this;
    }

    setCode(code: string): TrackingTypeBuilder {
        this.trackingType.code = code;
        return this;
    }

    static new(): TrackingTypeBuilder {
        return new TrackingTypeBuilder();
    }

    build(): TrackingType {
        return this.trackingType;
    }
}   
