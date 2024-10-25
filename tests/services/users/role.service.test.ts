import { RoleBuilder } from "@src/models/users/role.model";
import { Database } from "@src/services/database";
import { RoleService } from "@src/services/services/users/role.service";


describe("Kiểm tra RoleService", () => {
    jest.setTimeout(50 * 1000);

    let database: Database;
    let roleService: RoleService;

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

        roleService = new RoleService();
    });

    afterEach(async () => {
        await database.disconnect();
    });


    it("Lấy role theo id", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        const getRole = await roleService.get(role.id);

        expect(role.id).toBe(getRole.id);
    });

    it("Lấy tất cả role", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        const roles = await roleService.getAll();
        expect(roles).toEqual(expect.arrayContaining([role]));
    });

    it("Thêm role", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        expect(role.title).toBe("Admin");
    });

    it("Cập nhật role", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        role.title = "users";

        const updateRole = await roleService.update(role);
        expect(updateRole.title).toBe("users");
    });

    it("Xóa role", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());

        const deleted = await roleService.delete(role);
        expect(deleted).toBe(true);
    });
})