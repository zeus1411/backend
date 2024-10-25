import { CountryBuilder } from "@src/models/users/country.model";
import { Database } from "@src/services/database";
import { CountriesService } from "@src/services/services/users/country.service";

describe("Kiểm tra CountryService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let countryService: CountriesService;


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

        countryService = new CountriesService();
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy country theo id", async () => {
        const country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());
        const getCountry = await countryService.get(country.id);

        expect(country.id).toBe(getCountry.id);
    });

    it("Lấy tất cả country", async () => {
        const country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());
        const countries = await countryService.getAll();
        expect(countries).toEqual(expect.arrayContaining([country]));
    });

    it("Thêm country", async () => {
        const country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());
        expect(country.code).toBe("VN");
    });

    it("Cập nhật country", async () => {
        const country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());
        country.name = "users";

        const updateCountry = await countryService.update(country);

        expect(updateCountry.name).toBe("users");
    });

    it("Xóa country", async () => {
        const country = await countryService.create(CountryBuilder.new().setCode("VN").setName("Vietnam").setImage("").build());

        const deleted = await countryService.delete(country);
        expect(deleted).toBe(true);
    });

})