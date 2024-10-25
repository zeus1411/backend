import { Brands, BrandsBuilder } from "@src/models/products/brands.model";
import { Category, CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategory, ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { ProductBuilder } from "@src/models/products/product.model";
import { Database } from "@src/services/database";
import { ProductService } from "@src/services/services/products/products.service";
import { BrandsService } from '../../../src/services/services/products/brands.service';
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { ProductStatus } from "@interfaces/models/products/product.model";

describe("Kiểm tra ProductService", () => {
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


    it("Lấy product theo id", async () => {
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
        const getProduct = await productService.get(product.id);

        expect(product.id).toBe(getProduct.id);
    });

    it("Lấy tất cả product", async () => {
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
        const products = await productService.getAll();
        expect(products).toEqual(expect.arrayContaining([product]));
    });

    it("Lấy tất cả product theo category", async () => {
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
        const products = await productService.getProductByCategory(childCategory.parent);
        expect(products).toEqual(expect.arrayContaining([product]));
    });

    it("Lấy tất cả product theo category con", async () => {
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
        const products = await productService.getProductByChildCategory(childCategory);
        expect(products).toEqual(expect.arrayContaining([product]));
    });

    it("Thêm product", async () => {
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
        expect(product.price).toBe(1000);
    });

    it("Cập nhật product", async () => {
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
        product.price = 2000;

        const updateProduct = await productService.update(product);

        expect(updateProduct.price).toBe(2000);
    });

    it("Xóa product", async () => {
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

        const deleted = await productService.delete(product);

        expect(deleted).toBeTruthy();
    });

})