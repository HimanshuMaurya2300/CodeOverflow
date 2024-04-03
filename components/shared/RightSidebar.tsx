import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from './RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getTopPopularTags } from '@/lib/actions/tag.actions'

const RightSidebar = async () => {

    const hotQuestions = await getHotQuestions()
    const popularTags = await getTopPopularTags()

    // const popularTags = [
    //     { _id: '1', name: 'Javascript', totalQuestions: 5 },
    //     { _id: '2', name: 'React', totalQuestions: 10 },
    //     { _id: '3', name: 'Node', totalQuestions: 45 },
    //     { _id: '4', name: 'Next', totalQuestions: 2 },
    //     { _id: '5', name: 'CSS', totalQuestions: 1 },
    // ]

    return (
        <section className='background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden w-[350px] custom-scrollbar max-xl:hidden'>

            <div>
                <h3 className='h3-bold text-dark200_light900'>
                    Top Questions
                </h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {hotQuestions.map((question) => (
                        <Link
                            href={`/question/${question._id}`}
                            key={question._id}
                            className='flex cursor-pointer items-center justify-between gap-7'
                        >
                            <p className='body-medium text-dark500_light700'>
                                {question.title}
                            </p>
                            <Image
                                src={'/assets/icons/chevron-right.svg'}
                                alt='chevron right'
                                width={20}
                                height={20}
                                className='invert-colors'
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className='mt-16'>
                <h3 className='h3-bold text-dark200_light900'>
                    Popular Tags
                </h3>

                <div className='mt-7 flex flex-col gap-4'>
                    {popularTags.map((tag) => (
                        <RenderTag
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={tag.numberOfQuestions}
                            showCount
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default RightSidebar