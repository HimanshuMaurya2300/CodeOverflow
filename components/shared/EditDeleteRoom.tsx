'use client'

import { deleteRoom } from '@/lib/actions/room.action'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    roomId: string
}

const EditDeleteRoom = ({ roomId }: Props) => {

    const pathname = usePathname()
    const router = useRouter()

    // console.log(roomId)

    const handleEdit = () => {
        router.push(`/rooms/edit/${roomId}`)
    }

    const handleDelete = async () => {
        await deleteRoom({
            roomId,
            path: pathname
        })
    }

    return (
        <div className='flex items-center justify-end gap-3 max-sm:w-full'>

            {/* TODO: Alert Dialog */}

            <Image
                src='/assets/icons/edit.svg'
                alt='edit'
                height={14}
                width={14}
                className='cursor-pointer object-contain'
                onClick={handleEdit}
            />

            <Image
                src='/assets/icons/trash.svg'
                alt='delete'
                height={14}
                width={14}
                className='cursor-pointer object-contain'
                onClick={handleDelete}
            />
        </div>
    )
}

export default EditDeleteRoom