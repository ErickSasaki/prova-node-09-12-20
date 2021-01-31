import { Request, Response } from "express";
import { IUserModel } from "../models/user.model";
import UserService from "../services/user.service";

export default class UserController {

    public static async listUsers(request: Request, response: Response) {
        
        let users: IUserModel[] = [];

        try {
            users = await UserService.listUsers();
        } catch (error: any) {
            response.status(500).send(error);
        }

        if (!users.length) {
            response.status(204).send();
        }

        response.status(200).send({ data: users });

    }

    public static async createUser(request: Request, response: Response) {

        const users: IUserModel[] = await UserService.listUsers();
        const body = request.body;

        // Caso ja exista um username ou email cadastrado com o mesmo valor retorna erro.
        if (users.some((item) => item.username === body.username || item.email === body.email)) {
            response.status(400).send('Username ou email já cadastrado.');
        }

        if (!body.username || !body.email || !body.name) {
            response.status(400).send();
        }

        try {
            const res = await UserService.createUser(request.body);
            response.status(201).send(res);
        } catch (error: any) {
            response.status(500).send(error);
        }

    }

    public static async deleteUser(request: Request, response: Response) {

        const userId = request.params?.userId;
        const user = await UserService.getUser(userId)

        if (!user) {
            response.status(404).send();
        }

        try {
            const res = await UserService.deleteUser(userId);
            response.status(200).send(res);
        } catch (error: any) {
            response.status(500).send(error);
        }

    }

    public static async updateUser(request: Request, response: Response) {

        const userId: string = request.params?.userId;
        const user: IUserModel = await UserService.getUser(userId)
        const body: any = request.body;

        if (!user) {
            response.status(404).send();
        }

        if (!body.username || !body.email || !body.name) {
            response.status(400).send();
        }

        try {
            const res = await UserService.updateUser(userId, request.body);
            response.status(200).send(res);
        } catch (error: any) {
            response.status(500).send(error);
        }

    }

}