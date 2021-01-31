import UserModel, { IUserModel } from "../models/user.model";

export default class UserService {

    public static async getUser(userId: string) {
        return await UserModel.findById(userId);
    }

    public static async listUsers(): Promise<IUserModel[]> {
        return await UserModel.find();
    }

    public static async createUser(body: any) {
        return await UserModel.create(body);
    }

    public static async deleteUser(userId: string) {

        return await UserModel.findByIdAndRemove(userId);
    }

    public static async updateUser(userId: string, body: any) {
        return await UserModel.findByIdAndUpdate(userId, body);
    }

}