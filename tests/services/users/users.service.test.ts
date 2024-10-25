import { UserBuilder, Users } from '@src/models/users/users.model';
import { UsersService } from '../../../src/services/services/users/users.service';
import { Database } from '@src/services/database';
import { Countries, CountryBuilder } from '@src/models/users/country.model';
import { Website, WebsiteBuilder } from '../../../src/models/website.model';
import { CountriesService } from '@src/services/services/users/country.service';
import { WebsiteService } from '@src/services/services/website.service';
import { Role, RoleBuilder } from '@src/models/users/role.model';
import { RoleService } from '@src/services/services/users/role.service';

describe("Kiểm tra UserService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let usersService: UsersService;

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

        usersService = new UsersService();

        const countryService = new CountriesService();
        country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());

        const websiteService = new WebsiteService();
        website = await websiteService.create(WebsiteBuilder.new().setTitle("Test").setDomain("test.com").setCdn("cdn").setLogo("").setSettings([]).build());

        const roleService = new RoleService();
        role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
    });

    afterEach(async () => {
        await database.disconnect();
    });

    it("Lấy user theo id", async () => {
        const newUser = await usersService.create(UserBuilder.new()
            .setFullname("Nguyễn Văn A")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build()
        );

        const user = await usersService.get(newUser.id);
        expect(user.id).toBe(newUser.id);
    });

    it("Lấy tất cả user", async () => {
        const newUser = await usersService.create(UserBuilder.new()
            .setFullname("Nguyễn Văn A")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build()
        );

        const users = await usersService.getAll();
        expect(users).toEqual(expect.arrayContaining([newUser]));
    });

    it("Thêm user", async () => {
        const user = UserBuilder.new()
            .setFullname("Nguyễn Văn A")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build();

        const newUser = await usersService.create(user);

        expect(newUser.fullname).toBe(user.fullname);
        expect(newUser.phone).toBe(user.phone);
        expect(newUser.balance).toBe(user.balance);
    });

    it("Cập nhật user", async () => {
        const user = UserBuilder.new()
            .setFullname("Nguyễn Văn B")
            .setPhone("0123456789")
            .setBalance(0).setPassword("")
            .setCountry(country)
            .setWebsite(website)
            .setRole(role)
            .build();

        const newUser = await usersService.create(user);

        const updateUser = await usersService.update({
            ...newUser,
            balance: 100
        });

        expect(updateUser.fullname).toBe(newUser.fullname);
        expect(updateUser.phone).toBe(newUser.phone);
        expect(updateUser.balance).toBe(100);
    });
});
