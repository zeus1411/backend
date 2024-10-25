import { ProductBuilder, Products } from "@src/models/products/product.model";
import { UserBuilder, Users } from "@src/models/users/users.model";
import { Website, WebsiteBuilder } from "@src/models/website.model";
import { Database } from "@src/services/database";
import { OrdersService } from "@src/services/services/orders/orders.service";
import { AddressService } from "@src/services/services/users/address.service";
import { UsersService } from "@src/services/services/users/users.service";
import { WebsiteService } from '../../../src/services/services/website.service';
import { Address, AddressBuilder } from "@src/models/users/address.model";
import { Countries, CountryBuilder } from "@src/models/users/country.model";
import { CountriesService } from "@src/services/services/users/country.service";
import { ProductService } from "@src/services/services/products/products.service";
import { ProductStatus } from "@interfaces/models/products/product.model";
import { BrandsBuilder } from "@src/models/products/brands.model";
import { CategoryBuilder } from "@src/models/products/category.model";
import { ChildCategoryBuilder } from "@src/models/products/child-category.model";
import { BrandsService } from "@src/services/services/products/brands.service";
import { CategoryService } from "@src/services/services/products/category.service";
import { ChildCategoryService } from "@src/services/services/products/child-category.service";
import { OrdersBuilder } from "@src/models/orders/orders.model";
import { DeliveryStatus, PaymentStatus } from "@interfaces/models/orders/orders.model";
import { RoleBuilder } from "@src/models/users/role.model";
import { RoleService } from "@src/services/services/users/role.service";

describe("Kiểm tra OrdersService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let ordersService: OrdersService;

    let user: Users;
    let address: Address;
    let product: Products;
    let website: Website;

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

        ordersService = new OrdersService();

        const countryService = new CountriesService();
        const country = await countryService.create(CountryBuilder.new().setCode("test").setName("test").setImage("test").build());

        const brandsService = new BrandsService();
        const brand = await brandsService.create(BrandsBuilder.new().setName("test").setImage("test").build());

        const categoryService = new CategoryService();
        const category = await categoryService.create(CategoryBuilder.new().setName("test").setImage("test").build());

        const roleService = new RoleService();
        const role = await roleService.create(RoleBuilder.new().setTitle("test").setPermission([]).build());

        const childCategoryService = new ChildCategoryService();
        const childCategory = await childCategoryService.create(ChildCategoryBuilder.new().setName("test").setImage("test").setParent(category).build());

        const websiteService = new WebsiteService();
        website = await websiteService.create(WebsiteBuilder.new().setLogo("test").setCdn("test").setDomain("test").setTitle("test").setSettings([]).build());

        const userService = new UsersService();
        user = await userService.create(UserBuilder.new().setRole(role).setCountry(country).setWebsite(website).setFullname("test").setPhone("921387216743").setPassword("test").build());

        const addressService = new AddressService();
        address = await addressService.create(AddressBuilder.new()
            .setUser(user)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const productService = new ProductService();
        product = await productService.create(ProductBuilder.new()
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
    })

    afterEach(async () => {
        await database.disconnect();
    })

    it("Lấy order theo id", async () => {
        const order = await ordersService.create(
            OrdersBuilder.new()
                .setUser(user)
                .setAddress(address)
                .setProducts([product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setImages([])
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(website)
                .build()
        );

        const result = await ordersService.get(order.id);
        expect(result).not.toBe(null);
    })

    it("Lấy tất cả order", async () => {
        const order = await ordersService.create(
            OrdersBuilder.new()
                .setUser(user)
                .setAddress(address)
                .setProducts([product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(website)
                .build()
        );

        const result = await ordersService.getAll();

        expect(result).not.toBe(null);
        expect(result).toEqual(expect.arrayContaining([order]));
    })

    it("Thêm order", async () => {
        const order = await ordersService.create(
            OrdersBuilder.new()
                .setUser(user)
                .setAddress(address)
                .setProducts([product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(website)
                .build()
        )

        const getOrder = await ordersService.get(order.id);

        expect(order).not.toBe(null);
        expect(order.user).toEqual(getOrder.user);
        expect(order.addresses).toEqual(getOrder.addresses);
        expect(order.products).toEqual(getOrder.products);
        expect(order.orderCode).toEqual(getOrder.orderCode);
        expect(order.deposit).toEqual(getOrder.deposit);
        expect(order.orderPrice).toEqual(getOrder.orderPrice);
        expect(order.shipPrice).toEqual(getOrder.shipPrice);
        expect(order.discountPrice).toEqual(getOrder.discountPrice);
        expect(order.deliveryMethod).toEqual(getOrder.deliveryMethod);
        expect(order.deliveryStatus).toEqual(getOrder.deliveryStatus);
        expect(order.paymentMethod).toEqual(getOrder.paymentMethod);
        expect(order.paymentStatus).toEqual(getOrder.paymentStatus);
        expect(order.website).toEqual(getOrder.website);
    })

    it("Cập nhật order", async () => {
        const order = await ordersService.create(
            OrdersBuilder.new()
                .setUser(user)
                .setAddress(address)
                .setProducts([product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(website)
                .build()
        )

        order.deliveryMethod = "test2";

        const result = await ordersService.update(order);

        expect(result.id).toEqual(order.id);
        expect(result.deliveryMethod).toEqual("test2");
    })

    it("Xóa order", async () => {
        const order = await ordersService.create(
            OrdersBuilder.new()
                .setUser(user)
                .setAddress(address)
                .setProducts([product])
                .setOrderCode(1)
                .setDeposit(1)
                .setOrderPrice(1)
                .setShipPrice(1)
                .setDiscountPrice(1)
                .setDeliveryMethod("test")
                .setDeliveryStatus(DeliveryStatus.DELIVERED)
                .setPaymentMethod("test")
                .setPaymentStatus(PaymentStatus.PAID)
                .setWebsite(website)
                .build()
        )

        const result = await ordersService.delete(order);
        expect(result).toBe(true);
    })
})