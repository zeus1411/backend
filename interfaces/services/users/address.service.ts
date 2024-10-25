import { IUsers } from "@interfaces/models/users/users.model";
import { ServiceBase } from "../service-base";
import { IAddress } from "@interfaces/models/users/address.model";

export interface IAddressService extends ServiceBase<IAddress, number> {
    /**
     * Lấy danh sách địa chỉ của người dùng
     * 
     * @param user Người dùng cần lấy danh sách 
     */
    getAddressByUser(user: IUsers): Promise<IAddress[]>;

    /**
     * Lấy địa chỉ mặc định người dùng 
     * 
     * @param user Người dùng cần lấy 
     */
    getSelectedAddressByUser(user: IUsers): Promise<IAddress>;
}