import { Sequelize, SequelizeOptions, DataType } from 'sequelize-typescript';
import path from "path";

export class Database {
    private static database: Sequelize | undefined;
    private static instance: Database;

    private hostname: string;
    private username: string;
    private password: string;
    private port: number | 3306;
    private dbname: string;

    private constructor(hostname: string, username: string, password: string, port: number | 3306, dbname: string) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.port = port;
        this.dbname = dbname;
    }

    public static init(hostname: string, username: string, password: string, port: number | 3306, dbname: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(hostname, username, password, port, dbname);
        }
        return Database.instance;
    }

    public static getInstance() {
        return Database.instance;
    }

    public static getDatabase(): Sequelize | undefined {
        return Database.database;
    }

    public connect(): Sequelize {
        if (!Database.database) {
            const opts: SequelizeOptions = {
                dialect: "mariadb",
                dialectOptions: {
                    dateStrings: true,
                    typeCast: true
                },
                username: this.username,
                password: this.password,
                host: this.hostname,
                port: this.port,
                database: this.dbname,
                models: [path.resolve(__dirname, 'database/**/*.database.ts')],
                logging: false,
            };
            Database.database = new Sequelize(opts);
        }
        return Database.database;
    }

    public async disconnect(): Promise<void> {
        if (Database.database) {
            await Database.database.close();
            Database.database = undefined;
        }
    }
}
