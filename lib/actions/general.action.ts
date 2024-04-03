'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";
import { StreamChat } from 'stream-chat'
import { getSession } from "../utils";

const SearchableTypes = ['question', 'user', 'answer', 'tag']

export async function globalSearch(params: SearchParams) {
    try {
        connectToDatabase()

        const { query, type } = params
        const regexQuery = { $regex: query, $options: 'i' }

        let results = []

        const modelsAndTypes = [
            { model: Question, searchField: 'title', type: 'question' },
            { model: User, searchField: 'name', type: 'user' },
            { model: Answer, searchField: 'content', type: 'answer' },
            { model: Tag, searchField: 'name', type: 'tag' },
        ]

        const typeLower = type?.toLowerCase()

        if (!typeLower || !SearchableTypes.includes(typeLower)) {

            for (const { model, searchField, type } of modelsAndTypes) {

                const queryResults = await model
                    .find({ [searchField]: regexQuery })
                    .limit(2)

                results.push(
                    ...queryResults.map((item) => ({
                        title: type === 'answer'
                            ? `Answers containig ${query}` : item[searchField],
                        type,
                        id: type === 'user'
                            ? item.clerkId : type === 'anser' ? item.question : item._id
                    }))
                )
            }
        }
        else {
            const modelInfo = modelsAndTypes.find((item) => {
                return item.type === typeLower
            })

            if (!modelInfo) {
                throw new Error('Invalid search type')
            }

            const queryResults = await modelInfo.model
                .find(
                    { [modelInfo.searchField]: regexQuery }
                )
                .limit(8)

            results = queryResults.map((item) => ({
                title: type === 'answer'
                    ? `Answers containig ${query}` : item[modelInfo.searchField],
                type,
                id: type === 'user'
                    ? item.clerkId : type === 'anser' ? item.question : item._id
            }))
        }

        return JSON.stringify(results)

    } catch (error) {
        console.log(`Error fetching global search results: ${error}`)
        throw error
    }
}

export async function generateToken() {

    const userId = await getSession()

    if (!userId) throw new Error('Session not found')

    // Define values.
    const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY
    const api_secret = process.env.NEXT_PUBLIC_STREAM_SECRET

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    // Create User Token
    const token = serverClient.createToken(userId);

    return token
}