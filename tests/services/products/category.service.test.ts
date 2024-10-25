import { CategoryBuilder } from "@src/models/products/category.model";
import { Database } from "@src/services/database";
import { CategoryService } from "@src/services/services/products/category.service";

describe("Kiểm tra CategoryService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let categoryService: CategoryService;


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

        categoryService = new CategoryService();
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy category theo id", async () => {
        const category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());
        const getCategory = await categoryService.get(category.id);

        expect(category.id).toBe(getCategory.id);
    });

    it("Cập nhật category", async () => {
        const category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());
        category.name = "test2";

        const updateCategory = await categoryService.update(category);
        expect(updateCategory.name).toBe("test2");
    });

    it("Xóa category", async () => {
        const category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());
        const deleted = await categoryService.delete(category);

        expect(deleted).toBe(true);
    });

})

