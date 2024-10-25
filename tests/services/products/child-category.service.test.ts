import { Category, CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { Database } from "@src/services/database";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";

describe("Kiểm tra ChildCategoryService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let childCategoryService: ChildCategoryService;

    let category: Category;

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

        childCategoryService = new ChildCategoryService();

        const categoryService = new CategoryService();
        category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy childCategory theo id", async () => {
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());
        const getChildCategory = await childCategoryService.get(childCategory.id);

        expect(childCategory.id).toBe(getChildCategory.id);
    });

    it("Lấy tất cả childCategory", async () => {
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());
        const childCategories = await childCategoryService.getAll();
        expect(childCategories).toEqual(expect.arrayContaining([childCategory]));
    });

    it("Thêm childCategory", async () => {
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());

        expect(childCategory.name).toBe("test");
    });

    it("Cập nhật childCategory", async () => {
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());
        childCategory.name = "test2";

        const updateChildCategory = await childCategoryService.update(childCategory);
        expect(updateChildCategory.name).toBe("test2");
    });

    it("Xóa childCategory", async () => {
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());

        const deleted = await childCategoryService.delete(childCategory);

        expect(deleted).toBe(true);
    });
})