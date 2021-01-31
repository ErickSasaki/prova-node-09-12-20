import bodyParser from "body-parser";
import express from "express";
import Database from "./database/database-config";
import router from "./routes";

export default class App {

    public app = express();

    private appConfig(): void {

        new Database('admin', 'admin123', 'user').connectToDatabase();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(router);
    }

    /**
     * Inicia o servidor.
     */
    public start(port: number): void {
        this.appConfig();
        this.app.listen(port);
        console.log(`Server iniciado na porta ${port}`);
    }

}