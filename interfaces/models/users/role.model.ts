/**
 * 
 * Interface: IRole
 * 
 */

export interface IRole {
    id: number;
    title: string;
    permission: string[];

    /**
     * Thêm quyền hạn cho role
     * 
     * @param permission quyền hạn muốn thêm
     * 
     */
    addPermission(permission: string): Promise<void>;
}
