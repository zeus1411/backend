import { WebsiteBuilder } from "@src/models/website.model";
import { Database } from "@src/services/database";
import { WebsiteService } from "@src/services/services/website.service";

describe("Kiểm tra WebsiteService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let websiteService: WebsiteService;

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

        websiteService = new WebsiteService();

    })

    afterEach(async () => {
        await database.disconnect();
    })

    it("Kiểm tra lấy website", async () => {
        const website = await websiteService.create(WebsiteBuilder.new().setDomain("test").setLogo("test").setCdn("test").setTitle("test").setSettings([]).build());

        const getWebsite = await websiteService.get(website.id);
        expect(getWebsite).not.toBeNull();
        expect(getWebsite.id).toBe(website.id);
        expect(getWebsite.domain).toBe(website.domain);
        expect(getWebsite.logo).toBe(website.logo);
        expect(getWebsite.cdn).toBe(website.cdn);
        expect(getWebsite.title).toBe(website.title);
    })

    it("Kiểm tra lấy tất cả website", async () => {
        const website = await websiteService.create(WebsiteBuilder.new().setDomain("test").setLogo("test").setCdn("test").setTitle("test").setSettings([]).build());

        const getWebsite = await websiteService.get(website.id);
        const websites = await websiteService.getAll();

        expect(websites).not.toBeNull();
        expect(websites).toEqual(expect.arrayContaining([website]));
    })

    it("Kiểm tra thêm website", async () => {
        const website = await websiteService.create(WebsiteBuilder.new().setDomain("test").setLogo("test").setCdn("test").setTitle("test").setSettings([]).build());

        expect(website.domain).toBe("test");
        expect(website.logo).toBe("test");
        expect(website.cdn).toBe("test");
        expect(website.title).toBe("test");
    })

    it("Kiểm tra cập nhật website", async () => {
        const website = await websiteService.create(WebsiteBuilder.new().setDomain("test").setLogo("test").setCdn("test").setTitle("test").setSettings([]).build());
        website.domain = "test2";
        const updateWebsite = await websiteService.update(website);
        expect(updateWebsite.domain).toBe("test2");
    })

    it("Kiểm tra xóa website", async () => {
        const website = await websiteService.create(WebsiteBuilder.new().setDomain("test").setLogo("test").setCdn("test").setTitle("test").setSettings([]).build());
        const deleted = await websiteService.delete(website);
        expect(deleted).toBeTruthy();
    })
})