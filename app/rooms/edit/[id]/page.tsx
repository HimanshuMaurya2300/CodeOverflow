import CreateRoom from '@/components/forms/CreateRoom'
import { getUserById } from '@/lib/actions/user.action'
import React from 'react'
import { auth } from '@clerk/nextjs'
import { getRoomById } from '@/lib/actions/room.action'
import { ParamsProps } from '@/types'

const page = async ({ params }: ParamsProps) => {

    // const { userId } = auth()
    const userId = '12345'

    if (!userId) {
        return null
    }

    const mongoUser = await getUserById({ userId })
    const room = await getRoomById({ roomId: params.id })

    return (
        <div>
            <CreateRoom
                type='edit'
                mongoUserId={mongoUser._id}
                roomDetails={JSON.stringify(room)}
            />
        </div>
    )
}

export default page