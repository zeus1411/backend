import { IRole } from "@interfaces/models/users/role.model";
import { RoleService } from "@src/services/services/users/role.service";

export class Role implements IRole {
    id: number;
    title: string;
    permission: string[];

    async addPermission(permission: string): Promise<void> {
        const roleService = new RoleService();
        this.permission.push(permission);
        await roleService.update(this);
    }
}

export class RoleBuilder {
    role: IRole;
    private constructor() {
        this.role = new Role();
    }

    static new() {
        return new RoleBuilder();
    }

    setTitle(title: string) {
        this.role.title = title;
        return this;
    }

    setPermission(permission: string[]) {
        this.role.permission = permission;
        return this;
    }

    build() {
        return this.role;
    }
}