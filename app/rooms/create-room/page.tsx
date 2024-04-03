import CreateRoom from '@/components/forms/CreateRoom'
import { getUserById } from '@/lib/actions/user.action'
import React from 'react'
import { auth } from '@clerk/nextjs'

const page = async () => {

    // const { userId } = auth()
    const userId = '12345'

    if (!userId) {
        return null
    }

    const mongoUser = await getUserById({ userId })

    return (
        <div>
            <CreateRoom
                type='create'
                mongoUserId={mongoUser._id}
                roomDetails='{}'
            />
        </div>

    )
}

export default page