'use server'

import Room from "@/database/room.model"
import { connectToDatabase } from "../mongoose"
import { CreateRoomParams, DeleteRoomParams, EditRoomParams, GetRoomByIdParams, GetRoomsParams, GetUserRoomsParams } from "./shared.types"
import { revalidatePath } from "next/cache"
import { FilterQuery } from "mongoose"


export async function createRoom(params: CreateRoomParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { name, description, tags, githubRepo, author, path } = params

        const room = await Room.create({
            name,
            description,
            tags,
            githubRepo,
            author,
        })

        console.log(room)

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function getRooms(params: GetRoomsParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { searchQuery, page = 1, pageSize = 10 } = params

        const skipAmount = (page - 1) * pageSize

        const query: FilterQuery<typeof Room> = {}

        if (searchQuery) {
            query.$or = [
                { name: { $regex: new RegExp(searchQuery, 'i') } },
                { description: { $regex: new RegExp(searchQuery, 'i') } },
                { tags: { $regex: new RegExp(searchQuery, 'i') } }
            ]
        }

        const rooms = await Room.find(query)
            .skip(skipAmount)
            .limit(pageSize)
            .sort({ createdAt: -1 })

        const totalRooms = await Room.countDocuments(query)

        const isNext = totalRooms > skipAmount + rooms.length

        return { rooms, isNext }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


export async function getUserRooms(params: GetUserRoomsParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { userId, page = 1, pageSize = 10 } = params

        const skipAmount = (page - 1) * pageSize

        const rooms = await Room.find({ author: userId })
            .sort({ createdAt: -1 })
            .skip(skipAmount)
            .limit(pageSize)

        const totalRooms = await Room.countDocuments({ author: userId })

        const isNext = totalRooms > skipAmount + rooms.length

        return { rooms, isNext }

    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function getRoomById(params: GetRoomByIdParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { roomId } = params

        const room = await Room.findById(roomId)

        return room
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function deleteRoom(params: DeleteRoomParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { roomId, path } = params

        await Room.findByIdAndDelete(roomId)

        revalidatePath(path)

    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function editRoom(params: EditRoomParams) {
    try {
        // connect to db
        await connectToDatabase()

        const { roomId, name, description, githubRepo, path } = params

        const room = await Room.findById(roomId).populate('tags')

        if (!room) {
            throw new Error('Room not found')
        }

        room.name = name
        room.description = description
        room.githubRepo = githubRepo

        await room.save()

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}