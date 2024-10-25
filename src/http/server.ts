import { IBaseHandle } from "@interfaces/http/handlers";
import { AServer, IConstructHandler } from "@interfaces/http/server";
import express, { Router, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { Database } from "@src/services/database";

export class App extends AServer {
    protected _handles: IConstructHandler<any>[] = [];
    protected _app = express();
    protected _database: Database;
    protected _routers = new Map<string, Router>();

    registerHandlers(handlers: IConstructHandler<any>[]): void {
        this._handles = handlers;
    }

    registerRouters(): void {
        this._handles.forEach(constructHandler => {
            const router = Router();
            const handler = constructHandler.handler;
            const middleware = constructHandler.middleware;

            if (middleware) router.all(`${handler.path}/*`, ...middleware);

            router.post(handler.path, handler.create);
            router.put(`${handler.path}/:id`, handler.update);

            router.get(handler.path, handler.read);
            router.get(`${handler.path}/:id`, handler.read);

            router.delete(handler.path, handler.delete);
            router.delete(`${handler.path}/:id`, handler.delete);

            this._routers.set(handler.path, router);
        });
    }

    async listen(port: number): Promise<this> {
        await this.initDatabase();
        await this.run(port);
        return this;
    }

    async run(port: number): Promise<void> {
        this._routers.forEach((router: Router, path: string) => {
            this._app.use(path, router);
        });

        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());

        this._app.on("close", async () => await this.stop());
        this._app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }

    async stop(): Promise<void> {
        await this._database.disconnect();
        console.log("Server stopped");
    }

    private async initDatabase() {
        this._database = Database.getInstance();

        const dataStorage = this._database.connect();
        await dataStorage.authenticate();
        await dataStorage.sync({ force: true, alter: true });

        console.log("Connected to database!");
    }
}
