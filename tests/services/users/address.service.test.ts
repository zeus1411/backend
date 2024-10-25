import { AddressBuilder } from "@src/models/users/address.model";
import { Countries, CountryBuilder } from "@src/models/users/country.model";
import { Role, RoleBuilder } from "@src/models/users/role.model";
import { UserBuilder, Users } from "@src/models/users/users.model";
import { Website, WebsiteBuilder } from "@src/models/website.model";
import { Database } from "@src/services/database";
import { AddressService } from "@src/services/services/users/address.service";
import { CountriesService } from "@src/services/services/users/country.service";
import { RoleService } from "@src/services/services/users/role.service";
import { UsersService } from "@src/services/services/users/users.service";
import { WebsiteService } from "@src/services/services/website.service";

describe("Kiểm tra AddressService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let addressService: AddressService;

    let users: Users;
    let users2: Users;
    let country: Countries;
    let website: Website;
    let role: Role;

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

        addressService = new AddressService();

        const countryService = new CountriesService();
        country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());

        const websiteService = new WebsiteService();
        website = await websiteService.create(WebsiteBuilder.new().setTitle("Test").setDomain("test.com").setCdn("cdn").setLogo("").setSettings([]).build());

        const roleService = new RoleService();
        role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());

        const usersService = new UsersService();
        const userBuilder = UserBuilder.new().setFullname("Nguyễn Văn A").setPhone("0123456789").setBalance(0).setPassword("").setCountry(country).setWebsite(website).setRole(role).build()

        users = await usersService.create(userBuilder);
        userBuilder.fullname = "Nguyễn Văn B";
        userBuilder.phone = "01234567892";
        users2 = await usersService.create(userBuilder);
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy address theo id", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );
        const getAddress = await addressService.get(address.id);

        expect(address.id).toBe(getAddress.id);
        expect(address.name).toBe(getAddress.name);
        expect(address.phone).toBe(getAddress.phone);
    });

    it("Lấy tất cả address", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const addresses = await addressService.getAll();
        expect(addresses).toEqual(expect.arrayContaining([address]));
    });

    it("Lấy tất cả address theo user", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const address2 = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test2")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const address3 = await addressService.create(AddressBuilder.new()
            .setUser(users2)
            .setAddresses("test3")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const addresses = await addressService.getAddressByUser(users);
        expect(addresses).toEqual(expect.arrayContaining([address, address2]));
        expect(addresses).not.toEqual(expect.arrayContaining([address, address2, address3]));
    });

    it("Lấy address mặc định", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(false)
            .build()
        );

        const address2 = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test2")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const address3 = await addressService.create(AddressBuilder.new()
            .setUser(users2)
            .setAddresses("test3")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(false)
            .build()
        );

        const addresses = await addressService.getSelectedAddressByUser(users);
        expect(addresses).toEqual(address2);
    });

    it("Thêm address", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        expect(address.name).toBe("test");
        expect(address.phone).toBe("0123456789");
        expect(address.addresses).toBe("test");
    });

    it("Cập nhật address", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        address.name = "users";

        const updateAddress = await addressService.update(address);

        expect(updateAddress.name).toBe("users");
    });

    it("Xóa address", async () => {
        const address = await addressService.create(AddressBuilder.new()
            .setUser(users)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()
        );

        const deleted = await addressService.delete(address);

        expect(deleted).toBeTruthy();
    });

})