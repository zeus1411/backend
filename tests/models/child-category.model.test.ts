import { ProductStatus } from "@interfaces/models/products/product.model";
import { BrandsBuilder } from "@src/models/products/brands.model";
import { Category, CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { ProductBuilder } from "@src/models/products/product.model";
import { Database } from "@src/services/database";
import { BrandsService } from "@src/services/services/products/brands.service";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { ProductService } from "@src/services/services/products/products.service";

describe("Kiểm tra ChildCategoryService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let childCategoryService: ChildCategoryService;

    let category: Category;
    let category2: Category;

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
        category2 = await categoryService.create(CategoryBuilder.new().setName("test2").setImage("test").build());
    });

    afterEach(async () => {
        await database.disconnect();
    });

    it("Kiểm tra hàm changeParent", async () => {
        const productService = new ProductService();
        const brandsService = new BrandsService();

        const brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());

        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());
        const product = await productService.create(ProductBuilder.new()
            .setName("test")
            .setDescription("test")
            .setStatus(ProductStatus.INSTOCK)
            .setBrand(brand)
            .setChildCategory(childCategory)
            .setImportPrice(1000)
            .setPrice(1000)
            .setImage("test")
            .setImages([])
            .build()
        );

        await childCategory.changeParent(category2);

        const getProduct = await productService.get(product.id);
        const getChildCategory = await childCategoryService.get(childCategory.id);

        expect(getChildCategory.parent.id).toBe(category2.id);
        expect(getChildCategory.parent.name).toBe(category2.name);
        expect(getProduct.category.id).toBe(getChildCategory.parent.id);
        expect(getProduct.category.name).toBe(getChildCategory.parent.name);
    });

});