import { IWebsites } from "@interfaces/models/website.model";
import { IWebsiteService } from "@interfaces/services/website.service";
import { plainToInstance } from "class-transformer";
import WebsiteDB from "../database/websites.database";
import { Website } from "@src/models/website.model";
import { dateFormat } from "@src/utils/date-format";

export class WebsiteService implements IWebsiteService {
    async get(id: number): Promise<IWebsites> {
        const website = await WebsiteDB.findByPk(id);
        if (!website) throw new Error("Website not found");
        return plainToInstance(Website, dateFormat(website?.dataValues));
    }
    async getAll(): Promise<IWebsites[]> {
        const websites = await WebsiteDB.findAll();
        return websites.map(item => plainToInstance(Website, dateFormat(item?.dataValues)));
    }
    async create(item: IWebsites): Promise<IWebsites> {
        const website = await WebsiteDB.create({ ...item });
        return await this.get(website.id);
    }
    async update(item: IWebsites): Promise<IWebsites> {
        const website = await WebsiteDB.findByPk(item.id);
        if (!website) throw new Error("Website not found");
        website.set(item);
        await website.save();
        return await this.get(website.id);
    }
    async delete(item: IWebsites): Promise<boolean> {
        const website = await WebsiteDB.findByPk(item.id);
        if (!website) throw new Error("Website not found");

        const query = await WebsiteDB.destroy({ where: { id: item.id } });
        return query > 0;
    }
}