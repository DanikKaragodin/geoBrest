import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
FullName:{
        type: String,
        required: true,
    },
email: {
        type: String,
        required: true,
        unique: true,
},
passwordHash: {
    type: String,
    required: true,
},
busId: {
    type: Number,
    required: true,
},
avatarUrl: String,
},
{
    timestamps: true,
}
,);
export default mongoose.model('users',UserSchema);