import { TrackingType, TrackingTypeBuilder } from "@src/models/orders/tracking-type.model";
import { Database } from "@src/services/database";
import { TrackingTypeService } from "@src/services/services/orders/tracking-type.service";


describe("Kiểm tra TrackingTypeService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let trackingTypeService: TrackingTypeService;

    beforeEach(async () => {
        Database.init(
            "localhost",
            "i4104",
            "I4104@2004",
            3306,
            "duongtran"
        );
        database = Database.getInstance();
        const db = database.connect();
        await db.authenticate();
        await db.sync({ force: true });

        trackingTypeService = new TrackingTypeService();
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy tracking type theo id", async () => {
        const type = await trackingTypeService.create(TrackingTypeBuilder.new().setName("test").setCode("test").build());

        const result = await trackingTypeService.get(type.id);
        expect(result).toEqual(type);
    });

    it("Lấy tất cả tracking type", async () => {
        const type = await trackingTypeService.create(TrackingTypeBuilder.new().setName("test").setCode("test").build());

        const result = await trackingTypeService.getAll();
        expect(result).toEqual(expect.arrayContaining([type]));
    });

    it("Cập nhật tracking type", async () => {
        const type = await trackingTypeService.create(TrackingTypeBuilder.new().setName("test").setCode("test").build());

        type.name = "test2";
        const result = await trackingTypeService.update(type);

        expect(result.name).toBe("test2");
    })

    it("Xóa tracking type", async () => {
        const type = await trackingTypeService.create(TrackingTypeBuilder.new().setName("test").setCode("test").build());
        const result = await trackingTypeService.delete(type);

        expect(result).toBeTruthy();
    })
})