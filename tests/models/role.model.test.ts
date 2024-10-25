import { RoleBuilder } from "@src/models/users/role.model";
import { Database } from "@src/services/database";
import { RoleService } from "@src/services/services/users/role.service";

describe("Kiểm tra model role", () => {
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

    it("Kiểm tra addPermission", async () => {
        const role = await roleService.create(RoleBuilder.new().setTitle("Admin").setPermission([]).build());
        await role.addPermission("test");

        const getRole = await roleService.get(role.id);

        expect(getRole.permission).toEqual(["test"]);
    })


})