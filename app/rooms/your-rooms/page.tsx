import UserRoomCard from '@/components/cards/UserRoomCard'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import { getUserRooms } from '@/lib/actions/room.action'
import { getUserById } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: SearchParamsProps) => {

    // const rooms = await Room.find()
    const { userId } = auth()
    const user = await getUserById({ userId })
    console.log(user)

    const result = await getUserRooms({
        userId: user?._id,
        page: searchParams?.page ? +searchParams.page : 1,
    })

    return (
        <>
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='h1-bold text-dark100_light900'>
                        Your Rooms
                    </h1>
                    <Button
                        className='primary-gradient w-fit !text-light-900'
                    >
                        <Link
                            href={'/rooms/create-room'}
                        >
                            Create Room
                        </Link>
                    </Button>
                </div>

                <section className='mt-12 grid max-sm:grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 justify-between max-sm:justify-center place-items-center'>
                    {result.rooms.length > 0 ? (result.rooms.map((room) => (
                        <div key={room._id}>
                            <UserRoomCard
                                name={room.name}
                                _id={room._id}
                                description={room.description}
                                tags={room.tags}
                                githubRepo={room.githubRepo}
                            />
                        </div>
                    ))) : (
                        <div className='paragrpah-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
                            <p>No rooms found</p>
                            <Link href={'/rooms/create-room'} className='mt-1 font-bold text-accent-blue'>
                                Create a room to be the first!
                            </Link>
                        </div>
                    )}
                </section>
            </div>

            <div className="mt-10">
                {result.isNext && <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result.isNext}
                />}
            </div>
        </>
    )
}

export default page