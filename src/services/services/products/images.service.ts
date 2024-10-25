import { IPicturesService } from '@interfaces/services/products/images.service';
import { Picture } from '../../../models/products/images.model';
import { IPictures } from '@interfaces/models/products/images.model';
import ImagesDB from '@src/services/database/products/images.database';
import { plainToInstance } from 'class-transformer';
import { dateFormat } from '@src/utils/date-format';

export class PicturesService implements IPicturesService {
    async get(id: number): Promise<IPictures> {
        const image = await ImagesDB.findByPk(id);
        if (!image) throw new Error("Image not found");
        return plainToInstance(Picture, dateFormat(image?.dataValues));
    }

    async getAll(): Promise<IPictures[]> {
        const images = await ImagesDB.findAll();
        return images.map(item => plainToInstance(Picture, dateFormat(item?.dataValues)));
    }

    async create(item: IPictures): Promise<IPictures> {
        const image = await ImagesDB.create({
            ...item
        });

        return await this.get(image.id);
    }

    async update(item: IPictures): Promise<IPictures> {
        const image = await ImagesDB.findByPk(item.id);
        if (!image) throw new Error("Image not found");
        image.set({ ...item });
        await image.save();
        return await this.get(image.id);
    }

    async delete(item: IPictures): Promise<boolean> {
        const image = await ImagesDB.findByPk(item.id);
        if (!image) throw new Error("Image not found");
        const query = await ImagesDB.destroy({
            where: { id: item.id }
        });
        return query > 0;
    }
}