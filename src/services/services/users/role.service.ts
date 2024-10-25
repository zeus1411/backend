import { IRole } from '@interfaces/models/users/role.model';
import { IRoleService } from '@interfaces/services/users/role.service';
import { Role } from '@src/models/users/role.model';
import RoleDB from '@src/services/database/users/role.database';
import { dateFormat } from '@src/utils/date-format';
import { plainToInstance } from 'class-transformer';


export class RoleService implements IRoleService {
    async get(id: number): Promise<IRole> {
        const role = await RoleDB.findByPk(id);
        if (!role) throw new Error("Role not found");
        return plainToInstance(Role, dateFormat(role?.dataValues));
    }
    async getAll(): Promise<IRole[]> {
        const roles = await RoleDB.findAll();
        return roles.map(item => plainToInstance(Role, dateFormat(item?.dataValues)));
    }
    async create(item: IRole): Promise<IRole> {
        const role = await RoleDB.create({
            title: item.title,
            permission: item.permission
        });

        return await this.get(role.id);
    }
    async update(item: IRole): Promise<IRole> {
        const role = await RoleDB.findByPk(item.id);
        if (!role) throw new Error("Role not found");

        role.set({ ...item });
        await role.save();

        return await this.get(role.id);
    }

    async delete(item: IRole): Promise<boolean> {
        const role = await RoleDB.findByPk(item.id);
        if (!role) throw new Error("Role not found");

        const query = await RoleDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }

}