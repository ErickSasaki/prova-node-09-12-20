import moongose, { Document } from 'mongoose';

export interface IUserModel extends Document {
    id: number,
    name: string,
    username: string,
    email: string,
};

const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
});

const UserModel = moongose.model<IUserModel>('User', UserSchema);

export default UserModel;