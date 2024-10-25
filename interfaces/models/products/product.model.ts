import { IBrands } from "./brands.model";
import { ICategory } from "./category.model";
import { IChildCategory } from "./child-category.model";

/**
 * 
 * Interface: IProducts
 * Enum: ProductStatus
 * 
 */
export enum ProductStatus {
    INSTOCK = 1,
    OUTSTOCK = 2,
    NORMAL = 0
}

export interface IProducts {
    id: number;
    name: string;
    description: string;

    importPrice: number;
    price: number;

    category: ICategory;
    childCategory: IChildCategory;
    brand: IBrands;
    tags: string[];

    image: string;
    images: string[];

    status: ProductStatus;

    /**
     * Thay đổi trạng thái của sản phẩm
     * 
     * @param status Trạng thái của sản phẩm 
     */
    setStatus(status: ProductStatus): Promise<void>;
}
