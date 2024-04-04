import Link from 'next/link'
import React from 'react'
import RenderTag from '../shared/RenderTag'
import { GithubIcon } from 'lucide-react'
import { Button } from '../ui/button'
import EditDeleteRoom from '../shared/EditDeleteRoom'


interface Props {
    name: string,
    _id: string,
    description: string,
    githubRepo: string,
    tags: string[],
}


const UserRoomCard = async ({ name, _id, description, githubRepo, tags }: Props) => {

    return (
        <article className='background-light900_dark200 light-border w-[300px] max-sm:w-[290px] sm:w-[270px] lg:w-[300px] h-[300px] items-center rounded-2xl border p-8 pt-4 col-span-1'>

            <div className='mt-4'>

                <div className='flex justify-between'>
                    <h3 className='h3-bold text-dark200_light900 line-clamp-1'>
                        {name}
                    </h3>
                    <EditDeleteRoom
                        roomId={_id}
                    />
                </div>

                <p className='body-regular text-dark500_light500 mt-2 line-clamp-4'>
                    {description}
                </p>

                <div className='mt-3 flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                        <div className='flex items-center gap-2'
                            key={tag}
                        >
                            <RenderTag
                                _id={tag}
                                key={tag}
                                name={tag}
                                room={true}
                            />
                        </div>
                    ))}
                </div>

                <Link
                    href={githubRepo}
                    className='mt-3 flex items-center gap-2 text-dark200_light900'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <GithubIcon
                        size={20}
                    />
                    Github Project
                </Link>

                <Button
                    className='primary-gradient w-fit !text-light-900 mt-4'
                >
                    <Link
                        href={`/rooms/${_id}`}
                    >
                        Join Room
                    </Link>
                </Button>
            </div>
        </article>
    )
}

export default UserRoomCard