import { BrandsBuilder } from "@src/models/products/brands.model";
import { Database } from "@src/services/database";
import { BrandsService } from "@src/services/services/products/brands.service";

describe("Kiểm tra BrandsService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let brandsService: BrandsService;


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

        brandsService = new BrandsService();
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy brands theo id", async () => {
        const brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());
        const getBrand = await brandsService.get(brand.id);

        expect(brand.id).toBe(getBrand.id);
    });

    it("Cập nhật brands", async () => {
        const brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());
        brand.name = "test2";

        const updateBrand = await brandsService.update(brand);
        expect(updateBrand.name).toBe("test2");
    });

    it("Xóa brands", async () => {
        const brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());
        const deleted = await brandsService.delete(brand);

        expect(deleted).toBe(true);
    });
})