import { Schema, model, models, Document } from "mongoose";

export interface IRoom extends Document {
    name: string,
    description: string,
    tags: string[],
    githubRepo: string,
    createdAt: Date,
    author: Schema.Types.ObjectId,
}

const RoomSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    githubRepo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const Room = models.Room || model('Room', RoomSchema)

export default Room