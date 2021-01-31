import mongoose from 'mongoose';

export default class Database {

    private user: string;
    private password: string;
    private name: string;

    constructor(user: string, password: string, name: string) {
        this.user = user;
        this.password = password;
        this.name = name;
    }

    /**
     * Conecta no banco de dados usando os atributos do objeto (user, password, name).
     */
    public async connectToDatabase(): Promise<void> {

        const connectionString = `mongodb+srv://${this.user}:${this.password}@cluster0.reiam.mongodb.net/${this.name}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        // Caso ocorra erro na conexão será mostrado no console.
        const databaseConnection = mongoose.connection;
        databaseConnection.on('error', console.error.bind(console, 'connection error:'));

    }

}
