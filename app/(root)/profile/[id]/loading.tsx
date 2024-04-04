import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <section>
            <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
                <div className='flex flex-col items-start gap-4 lg:flex-row'>
                    <Skeleton className='size-40 rounded-full bg-slate-100 object-cover' />

                    <div className='mt-3'>
                        <Skeleton className='h-14 w-80 bg-slate-100' />
                        <Skeleton className='h-6 w-20 bg-slate-100' />

                        <div className='mt-5 flex flex-wrap gap-5'>
                            <Skeleton className='h-10 w-20 bg-slate-100' />
                            <Skeleton className='h-10 w-20 bg-slate-100' />
                            <Skeleton className='h-10 w-20 bg-slate-100' />
                        </div>
                    </div>

                    <div className='flex justify-end max-sm:mb-5 sm:mt-3'>
                        <Skeleton className='h-10 w-40 bg-slate-100' />
                    </div>
                </div>
            </div>

            <div>
                <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
                    <Skeleton className='h-28 rounded-md bg-slate-100' />
                    <Skeleton className='h-28 rounded-md bg-slate-100' />
                    <Skeleton className='h-28 rounded-md bg-slate-100' />
                    <Skeleton className='h-28 rounded-md bg-slate-100' />
                </div>
            </div>

            <div className='mt-10 flex gap-10'>
                <div className='flex flex-1 flex-col'>
                    <div className='flex'>
                        <Skeleton className='h-11 w-24 rounded-r-none bg-slate-100' />
                        <Skeleton className='h-11 w-24 rounded-l-none bg-slate-100' />
                    </div>

                    <div className='mt-5 flex w-full flex-col gap-6'>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Skeleton
                                key={item}
                                className='h-48 w-full rounded-xl bg-slate-100'
                            />
                        ))}
                    </div>
                </div>

                {/* <div className='flex min-w-[278px] flex-col max-lg:hidden'>
                    <Skeleton className='h-7 w-10' />
                    <div className='mt-7 flex flex-col gap-4'>
                        <Skeleton className='h-7 bg-slate-100' />
                        <Skeleton className='h-7 bg-slate-100' />
                        <Skeleton className='h-7 bg-slate-100' />
                        <Skeleton className='h-7 bg-slate-100' />
                        <Skeleton className='h-7 bg-slate-100' />
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Loading