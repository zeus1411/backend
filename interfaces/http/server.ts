import express, { RequestHandler } from 'express';
import { IBaseHandle } from "./handlers";

/**
 * 
 * Cấu trúc của một handler
 * - M: Các model của app
 * 
 * @property handler: Handle xử lý dữ liệu
 * @property middleware: Các func sẽ chạy trc khi tới handler, có thể bỏ trống
 * 
 */
export interface IConstructHandler<M> {
    handler: IBaseHandle<M>;
    middleware: RequestHandler[] | undefined;
}

export abstract class AServer {
    /**
     * 
     * Đăng ký một handle 
     * @param handler 
     * 
     */
    abstract registerHandlers(handler: IConstructHandler<any>[]): void;

    /**
     * 
     * Chuyển các function bên trong handle thành 1 router
     * 
     */
    abstract registerRouters(): void;

    /**
     * 
     * Khởi tạo server
     * @param port Port của server
     * 
     */
    abstract listen(port: number): Promise<this>;

    /**
     * 
     * Chạy server
     * 
     */
    abstract run(port: number): Promise<void>;

    /**
     * 
     * Dừng server
     * 
     */
    abstract stop(): Promise<void>;
}