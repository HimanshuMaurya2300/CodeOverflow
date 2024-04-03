import RenderTag from '@/components/shared/RenderTag'
import { getRoomById } from '@/lib/actions/room.action'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { VideoCall } from './video-player'

interface Props {
    params: {
        id: string
    },
}

const page = async ({ params }: Props) => {

    // console.log(params.id)

    const room = await getRoomById({ roomId: params.id })
    console.log(room)

    return (
        <div className='grid grid-cols-3 min-h-screen'>
            <div className='col-span-3 p-4'>
                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
                    <VideoCall
                        roomId={params.id}
                    />
                </div>
            </div >

            <div className='col-span-3 p-4'>
                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-3'>
                    <h1 className='h3-bold text-dark200_light900'>{room.name}</h1>
                    <Link
                        href={room.githubRepo}
                        className='flex items-center gap-2 text-dark200_light900 text-center'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <GithubIcon
                            size={20}
                        />
                        Github Project
                    </Link>
                    <h1 className='body-regular text-dark500_light500'>
                        {room.description}
                    </h1>

                    {room.tags.map((tag: any) => (
                        <div className='flex items-center gap-2'
                            key={tag}
                        >
                            <RenderTag
                                _id={tag}
                                key={tag}
                                name={tag}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default page