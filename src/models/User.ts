import { Model, Schema, model, Types } from 'mongoose';
import { IUser } from 'src/Interface/IUser';

const UserSchema : Schema = new Schema<IUser>({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,

    }
})

const User : Model<IUser> = model("User", UserSchema);

export  {User};