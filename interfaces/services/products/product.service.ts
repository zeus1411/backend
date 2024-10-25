import { ICategory } from "@interfaces/models/products/category.model";
import { ServiceBase } from "../service-base";
import { IProducts } from "@interfaces/models/products/product.model";

export interface IProductsService extends ServiceBase<IProducts, number> {
    /**
     * Lấy danh sách sản phẩm theo danh mục lớn
     * 
     * @param category danh mục lớn 
     */
    getProductByCategory(category: ICategory): Promise<IProducts[]>;

    /**
     * Lấy danh sách sản phẩm theo danh mục con
     * 
     * @param childCategory danh mục con
     */
    getProductByChildCategory(childCategory: ICategory): Promise<IProducts[]>;
}