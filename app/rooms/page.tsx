import RoomCard from '@/components/cards/RoomCard'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Button } from '@/components/ui/button'
import { getRooms } from '@/lib/actions/room.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: SearchParamsProps) => {

    // const rooms = await Room.find()

    const result = await getRooms({
        searchQuery: searchParams?.q,
        page: searchParams?.page ? +searchParams.page : 1,
    })

    return (
        <>
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='h1-bold text-dark100_light900'>
                        Find Dev Rooms
                    </h1>

                    <div className='flex gap-4'>
                        <Button
                            className='primary-gradient w-fit !text-light-900'
                        >
                            <Link
                                href={'/rooms/your-rooms'}
                            >
                                Your Rooms
                            </Link>
                        </Button>
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
                </div>

                <div className='mt-4'>
                    <LocalSearchbar
                        route='/rooms'
                        placeholder='Search rooms by name or tags(languages)'
                        otherClasses='w-full'
                        iconPosition='left'
                        imgSrc='/assets/icons/search.svg'
                    />
                </div>

                <section className='mt-12 flex flex-wrap gap-4 justify-between max-sm:justify-center'>
                    {result.rooms.length > 0 ? (result.rooms.map((room) => (
                        <div key={room._id}>
                            <RoomCard
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
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result.isNext}
                />
            </div>
        </>
    )
}

export default page