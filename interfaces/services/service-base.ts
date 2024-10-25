
export interface ServiceBase<M, ID> {
    /**
     * 
     * Lấy data theo id
     * 
     * @param id 
     * @throws Nếu data không tồn tại
     * 
     */
    get(id: ID): Promise<M>;

    /**
     * 
     * Lấy toàn bộ data
     * 
     */
    getAll(): Promise<M[]>;

    /**
     * 
     * Tạo một data mới
     * 
     * @param item 
     * @throws Error
     * 
     */
    create(item: M): Promise<M>;

    /**
     * 
     * Cập nhật data
     * 
     * @param item 
     * @throws Nếu data không tồn tại
     * 
     */
    update(item: M): Promise<M>;

    /**
     * 
     * Xóa data
     * 
     * @param item 
     * @throws Nếu data không tồn tại
     * 
     */
    delete(item: M): Promise<boolean>;
} 