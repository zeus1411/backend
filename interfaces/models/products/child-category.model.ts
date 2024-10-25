import { ICategory } from "./category.model";

/**
 * 
 * Interface: ICategory
 * 
 */
export interface IChildCategory {
    id: number;
    name: string;
    image: string;
    parent: ICategory;

    /**
     * Thay đổi danh mục cha, sẽ tự động update các sản phẩm (product) liên quan
     * 
     * @param parent Danh mục tra
     * 
     * @throws Danh mục cha không còn tồn tại
     */
    changeParent(parent: ICategory): Promise<void>;
}
