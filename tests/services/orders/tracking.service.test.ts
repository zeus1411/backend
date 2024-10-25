import { DeliveryStatus, PaymentStatus } from "@interfaces/models/orders/orders.model";
import { ProductStatus } from "@interfaces/models/products/product.model";
import { Orders, OrdersBuilder } from "@src/models/orders/orders.model";
import { TrackingType, TrackingTypeBuilder } from "@src/models/orders/tracking-type.model";
import { TrackingBuilder } from "@src/models/orders/trackings.model";
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
import { OrdersService } from "@src/services/services/orders/orders.service";
import { TrackingTypeService } from "@src/services/services/orders/tracking-type.service";
import { TrackingService } from "@src/services/services/orders/tracking.service";
import { BrandsService } from "@src/services/services/products/brands.service";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { ProductService } from "@src/services/services/products/products.service";
import { AddressService } from "@src/services/services/users/address.service";
import { CountriesService } from "@src/services/services/users/country.service";
import { RoleService } from "@src/services/services/users/role.service";
import { UsersService } from "@src/services/services/users/users.service";
import { WebsiteService } from "@src/services/services/website.service";


describe("Kiểm tra TrackingService", () => {
    jest.setTimeout(50 * 1000);

    let trackingService: TrackingService;

    beforeEach(async () => {
        await TestUtils.init();
        trackingService = new TrackingService();
    });

    afterEach(async () => {
        await TestUtils.destroy();
    });


    it("Lấy tất cả tracking", async () => {
        const tracking = await trackingService.create(TrackingBuilder.new().setOrder(TestUtils.order).setType(TestUtils.trackingType).build());

        const trackings = await trackingService.getAll();
        expect(trackings).toEqual(expect.arrayContaining([tracking]));
    })

    it("Tạo mới tracking", async () => {
        const tracking = await trackingService.create(TrackingBuilder.new().setOrder(TestUtils.order).setType(TestUtils.trackingType).build());

        const getTracking = await trackingService.get(tracking.id);
        expect(getTracking).toEqual(tracking);
    })

    it("Cập nhật tracking", async () => {
        const tracking = await trackingService.create(TrackingBuilder.new().setOrder(TestUtils.order).setType(TestUtils.trackingType).build());
        tracking.inlandCode = "test";

        const updateTracking = await trackingService.update(tracking);

        const getTracking = await trackingService.get(tracking.id);
        expect(getTracking).toEqual(updateTracking);
        expect(getTracking.inlandCode).toEqual("test");
    })

    it("Xóa tracking", async () => {
        const tracking = await trackingService.create(TrackingBuilder.new().setOrder(TestUtils.order).setType(TestUtils.trackingType).build());

        const deleteTracking = await trackingService.delete(tracking);
        expect(deleteTracking).toBeTruthy();
    })
})


class TestUtils {
    static database: Database;
    static ordersService: OrdersService;
    static user: Users;
    static address: Address;
    static product: Products;
    static website: Website;
    static order: Orders;
    static trackingType: TrackingType;

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

        const trackingTypeService = new TrackingTypeService();
        TestUtils.trackingType = await trackingTypeService.create(
            TrackingTypeBuilder.new().setName("test").setCode("test").build()
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
