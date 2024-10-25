export interface Request<Headers = any, Body = any, Path = any, Params = any, Method = any> {
    header: Headers;
    body: Body;
    path: Path;
    params: Params;
    method: Method;
}

export interface Response<Header = any, Body = any, StatusCode = number> {
    header: Header;
    body: Body;
    statusCode: StatusCode;
}

type ErrorResponse = Response<any, { err: string }, number>;

export interface IBaseHandle<M> {
    path: string;

    create(request: Request<any, M, any, any, any>): Promise<Response<any, M, number> | ErrorResponse>;
    update(request: Request<any, M, any, any, any>): Promise<Response<any, M, number> | ErrorResponse>;
    read(request: Request<any, M, any, any, any>): Promise<Response<any, M, number> | ErrorResponse>;
    delete(request: Request<any, M, any, any, any>): Promise<Response<any, M, number> | ErrorResponse>;
}

export abstract class FnHandler {

    handlerRequest(req: Request<any, any, any, any, any>) {

    }

    handlerResponse(header: any, body: any, statusCode: number): Response<any, any, number> {
        return {
            header,
            body,
            statusCode
        }
    }

    handlerResponseError(err: string, statusCode: number): Response<any, { err: string }, number> {
        return {
            header: {},
            body: { err },
            statusCode: statusCode
        }
    }

    methodNotAllowed(): Response<any, { err: string }, number> {
        return {
            header: {},
            body: { err: "Method not allowed" },
            statusCode: 405
        }
    }
}