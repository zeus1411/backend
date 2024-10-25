import { AddressBuilder } from "@src/models/users/address.model";
import { Countries, CountryBuilder } from "@src/models/users/country.model";
import { Role, RoleBuilder } from "@src/models/users/role.model";
import { UserBuilder } from "@src/models/users/users.model";
import { Website, WebsiteBuilder } from "@src/models/website.model";
import { Database } from "@src/services/database";
import { CountriesService } from "@src/services/services/users/country.service";
import { RoleService } from "@src/services/services/users/role.service";
import { UsersService } from "@src/services/services/users/users.service";
import { WebsiteService } from "@src/services/services/website.service";
import { AddressService } from '../../src/services/services/users/address.service';

describe("Kiểm tra model users", () => {

    jest.setTimeout(50 * 1000);

    let database: Database;
    let usersService: UsersService;

    let country: Countries;
    let website: Website;
    let role: Role;
    let role2: Role;

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

        usersService = new UsersService();

        const countryService = new CountriesService();
        country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());

        const websiteService = new WebsiteService();
        website = await websiteService.create(WebsiteBuilder.new().setTitle("Test").setDomain("test.com").setCdn("cdn").setLogo("").setSettings([]).build());

        const roleService = new RoleService();
        role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        role2 = await roleService.create(RoleBuilder.new().setTitle("Users").setPermission([]).build());
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Kiểm tra hàm setRole", async () => {
        const newUser = await usersService.create(UserBuilder.new()
            .setFullname("Nguyễn Văn A")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build()
        );

        await newUser.setRole(role2);

        const getUser = await usersService.get(newUser.id);

        expect(getUser.id).toBe(newUser.id);
        expect(getUser.role.id).toBe(role2.id);
        expect(getUser.role.title).toBe(role2.title);
    })

    it("Kiểm tra hàm setDefaultAddress", async () => {
        const addressService = new AddressService();

        const newUser = await usersService.create(UserBuilder.new()
            .setFullname("Nguyễn Văn A")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build()
        );

        const builder = AddressBuilder.new()
            .setUser(newUser)
            .setAddresses("test")
            .setName("test")
            .setPhone("0123456789")
            .setCountry(country)
            .setSelected(true)
            .build()

        await addressService.create(builder);
        const selected = await addressService.create({ ...builder, name: "test2", selected: true });
        await addressService.create({ ...builder, name: "test3", selected: false });

        await newUser.setDefaultAddress(selected);

        const getAddress = await addressService.getSelectedAddressByUser(newUser);

        expect(getAddress.id).toBe(selected.id);
        expect(getAddress.name).toBe(selected.name);
    })
})