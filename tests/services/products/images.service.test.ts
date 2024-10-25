import { PictureBuilder } from "@src/models/products/images.model";
import { Database } from "@src/services/database";
import { PicturesService } from "@src/services/services/products/images.service";

describe("Kiểm tra ImagesService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let imagesService: PicturesService;

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

        imagesService = new PicturesService();
    });

    afterEach(async () => {
        await database.disconnect();
    });

    it("Lấy images theo id", async () => {
        const image = await imagesService.create(PictureBuilder.new().setTitle("test").setUrl("test").setSize(1).build());
        const getImage = await imagesService.get(image.id);

        expect(image.id).toBe(getImage.id);
    });

    it("Lấy tất cả images", async () => {
        const image = await imagesService.create(PictureBuilder.new().setTitle("test").setUrl("test").setSize(1).build());
        const images = await imagesService.getAll();

        expect(images).toEqual(expect.arrayContaining([image]));
    });

    it("Thêm images", async () => {
        const image = await imagesService.create(PictureBuilder.new().setTitle("test").setUrl("test").setSize(1).build());

        expect(image.title).toBe("test");
        expect(image.url).toBe("test");
        expect(image.size).toBe(1);
    });

    it("Cập nhật images", async () => {
        const image = await imagesService.create(PictureBuilder.new().setTitle("test").setUrl("test").setSize(1).build());
        image.title = "test2";

        const updateImage = await imagesService.update(image);
        expect(updateImage.title).toBe("test2");
    });

    it("Xóa images", async () => {
        const image = await imagesService.create(PictureBuilder.new().setTitle("test").setUrl("test").setSize(1).build());
        const deleted = await imagesService.delete(image);

        expect(deleted).toBeTruthy();
    });
})