import { DeliveryStatus, PaymentStatus } from "@interfaces/models/orders/orders.model";
import { ProductStatus } from "@interfaces/models/products/product.model";
import { OrdersLogsBuilder } from "@src/models/orders/orders-logs.model";
import { Orders, OrdersBuilder } from "@src/models/orders/orders.model";
import { BrandsBuilder } from "@src/models/products/brands.model";
import { CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { Products, ProductBuilder } from "@src/models/products/product.model";
import { Address, AddressBuilder } from "@src/models/users/address.model";
import { CountryBuilder } from "@src/models/users/country.model";
import { RoleBuilder } from "@src/models/users/role.model";
import { Users, UserBuilder } from "@src/models/users/users.model";
import { Website, WebsiteBuilder } from "@src/models/website.model";
import { Database } from "@src/services/database";
import { OrdersLogsService } from "@src/services/services/orders/orders-logs.service";
import { OrdersService } from "@src/services/services/orders/orders.service";
import { BrandsService } from "@src/services/services/products/brands.service";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { ProductService } from "@src/services/services/products/products.service";
import { AddressService } from "@src/services/services/users/address.service";
import { CountriesService } from "@src/services/services/users/country.service";
import { RoleService } from "@src/services/services/users/role.service";
import { UsersService } from "@src/services/services/users/users.service";
import { WebsiteService } from "@src/services/services/website.service";


describe("Kiểm tra OrdersLogService", () => {
    jest.setTimeout(50 * 1000);

    let ordersLogService: OrdersLogsService;

    beforeEach(async () => {
        await TestUtils.init();
        ordersLogService = new OrdersLogsService();
    });

    afterEach(async () => {
        await TestUtils.destroy();
    });

    it("Lấy tất cả orders log", async () => {
        const ordersLogs = await ordersLogService.create(OrdersLogsBuilder.new().setUser(TestUtils.user).setOrder(TestUtils.order).setContent("").build());
        const ordersLogsList = await ordersLogService.getAll();
        expect(ordersLogsList).toEqual(expect.arrayContaining([ordersLogs]));
    })

    it("Tạo mới orders log", async () => {
        const ordersLogs = await ordersLogService.create(OrdersLogsBuilder.new().setUser(TestUtils.user).setOrder(TestUtils.order).setContent("").build());
        const getLogs = await ordersLogService.get(ordersLogs.id);
        expect(ordersLogs).toEqual(getLogs);
    })

    it("Cập nhật orders log", async () => {
        const ordersLogs = await ordersLogService.create(OrdersLogsBuilder.new().setUser(TestUtils.user).setOrder(TestUtils.order).setContent("").build());
        ordersLogs.content = "DONE!";

        const ordersLogsUpdate = await ordersLogService.update(ordersLogs);
        const getLogs = await ordersLogService.get(ordersLogsUpdate.id);
        expect(getLogs.content).toBe("DONE!");
    })

    it("Xóa orders log", async () => {
        const ordersLogs = await ordersLogService.create(OrdersLogsBuilder.new().setUser(TestUtils.user).setOrder(TestUtils.order).setContent("").build());
        const result = await ordersLogService.delete(ordersLogs);

        expect(result).toBeTruthy();
    })
});

class TestUtils {
    static database: Database;
    static ordersService: OrdersService;
    static user: Users;
    static address: Address;
    static product: Products;
    static website: Website;
    static order: Orders;

    static async destroy() {
        await TestUtils.database.disconnect();
    }

    static async init() {
        Database.init(
            "localhost",
            "i4104",
            "I4104@2004",
            3306,
            "duongtran"
        );
        TestUtils.database = Database.getInstance();
        const db = TestUtils.database.connect();
        await db.authenticate();
        await db.sync({ force: true });

        TestUtils.ordersService = new OrdersService();

        const countryService = new CountriesService();
        const country = await countryService.create(
            CountryBuilder.new().setCode("test").setName("test").setImage("test").build()
        );

        const brandsService = new BrandsService();
        const brand = await brandsService.create(
            BrandsBuilder.new().setName("test").setImage("test").build()
        );

        const categoryService = new CategoryService();
        const category = await categoryService.create(
            CategoryBuilder.new().setName("test").setImage("test").build()
        );

        const roleService = new RoleService();
        const role = await roleService.create(
            RoleBuilder.new().setTitle("test").setPermission([]).build()
        );

        const childCategoryService = new ChildCategoryService();
        const childCategory = await childCategoryService.create(
            ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build()
        );

        const websiteService = new WebsiteService();
        TestUtils.website = await websiteService.create(
            WebsiteBuilder.new().setLogo("test").setCdn("test").setDomain("test").setTitle("test").setSettings([]).build()
        );

        const userService = new UsersService();
        TestUtils.user = await userService.create(
            UserBuilder.new()
                .setRole(role)
                .setCountry(country)
                .setWebsite(TestUtils.website)
                .setFullname("test")
                .setPhone("921387216743")
                .setPassword("test")
                .build()
        );

        const addressService = new AddressService();
        TestUtils.address = await addressService.create(
            AddressBuilder.new()
                .setUser(TestUtils.user)
                .setAddresses("test")
                .setName("test")
                .setPhone("0123456789")
                .setCountry(country)
                .setSelected(true)
                .build()
        );

        const productService = new ProductService();
        TestUtils.product = await productService.create(
            ProductBuilder.new()
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

        TestUtils.order = await TestUtils.ordersService.create(
            OrdersBuilder.new()
                .setUser(TestUtils.user)
                .setAddress(TestUtils.address)
                .setProducts([TestUtils.product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(TestUtils.website)
                .build()
        );
    }
}
