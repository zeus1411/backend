import { FnHandler, IBaseHandle, Request, Response } from "@interfaces/http/handlers";
import { IUsers } from "@interfaces/models/users/users.model";
import { UsersService } from "@src/services/services/users/users.service";

export class UserHandler extends FnHandler implements IBaseHandle<IUsers> {
    path: string;

    constructor() {
        super();
        this.path = "/users";
    }

    async create(request: Request<any, IUsers, any, any, any>): Promise<Response<any, { err: string; }, number> | Response<any, IUsers, number>> {
        const userSerivce = new UsersService();
        const newUser = await userSerivce.create(request.body);
        return this.handlerResponse({}, newUser, 201);
    }

    update(request: Request<any, IUsers, any, any, any>): Promise<Response<any, { err: string; }, number> | Response<any, IUsers, number>> {

    }

    read(request: Request<any, IUsers, any, any, any>): Promise<Response<any, { err: string; }, number> | Response<any, IUsers, number>> {

    }

    delete(request: Request<any, IUsers, any, any, any>): Promise<Response<any, { err: string; }, number> | Response<any, IUsers, number>> {

    }

}