import { App } from "@src/http/server";
import { Database } from "@src/services/database";

const database = Database.init(
    "localhost",
    "i4104",
    "I4104@2004",
    3306,
    "duongtran"
);

/**
 * 
 * - Khởi tạo app mới
 * - Đăng ký các handle
 * - Đăng ký các router
 * - Starting...
 * 
 */
const app = new App();
app.registerRouters();

app.listen(8000);
