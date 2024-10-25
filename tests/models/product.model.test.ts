import { ProductStatus } from "@interfaces/models/products/product.model";
import { Brands, BrandsBuilder } from "@src/models/products/brands.model";
import { Category, CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategory, ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { ProductBuilder } from "@src/models/products/product.model";
import { Database } from "@src/services/database";
import { BrandsService } from "@src/services/services/products/brands.service";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { ProductService } from "@src/services/services/products/products.service";

describe("Kiểm tra model product", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let productService: ProductService;

    let brand: Brands;
    let category: Category;
    let childCategory: ChildCategory;

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

        productService = new ProductService();

        const brandsService = new BrandsService();
        brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());

        const categoryService = new CategoryService();
        category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());

        const childCategoryService = new ChildCategoryService();
        childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Kiểm tra hàm setStatus", async () => {
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

        await product.setStatus(ProductStatus.OUTSTOCK);

        const getProduct = await productService.get(product.id);

        expect(product.id).toBe(getProduct.id);
        expect(getProduct.status).toBe(ProductStatus.OUTSTOCK);
    })
})