'use client'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { RoomSchema } from '@/lib/validations'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from '../ui/badge';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createRoom, editRoom } from '@/lib/actions/room.action'


interface Props {
    type?: string
    mongoUserId: string
    roomDetails?: string
}

const CreateRoom = ({ type, mongoUserId, roomDetails }: Props) => {

    console.log(mongoUserId)

    const router = useRouter()
    const pathname = usePathname()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const parsedRoomDetails = roomDetails && JSON.parse(roomDetails || '')
    // console.log(parsedRoomDetails)

    const groupedTags = parsedRoomDetails?.tags

    const form = useForm<z.infer<typeof RoomSchema>>({
        resolver: zodResolver(RoomSchema),
        defaultValues: {
            name: parsedRoomDetails?.name || '',
            description: parsedRoomDetails?.description || '',
            tags: groupedTags || [],
            githubRepo: parsedRoomDetails?.githubRepo || '',
        },
    })

    async function onSubmit(values: z.infer<typeof RoomSchema>) {
        setIsSubmitting(true)
        try {
            if (type === 'edit') {
                await editRoom({
                    roomId: parsedRoomDetails._id,
                    name: values.name,
                    description: values.description,
                    githubRepo: values.githubRepo,
                    path: pathname
                })

                router.push(`/rooms/your-rooms`)
            }
            else {
                await createRoom({
                    name: values.name,
                    description: values.description,
                    tags: values.tags,
                    githubRepo: values.githubRepo,
                    author: mongoUserId,
                    // author: JSON.parse(mongoUserId),
                    path: pathname
                })
                //navigate to homepage
                router.push('/rooms')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsSubmitting(false)
        }
        console.log(values)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {

        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim()

            if (tagValue !== '') {
                if (tagValue.length > 15) {
                    return form.setError('tags', {
                        type: 'required',
                        message: 'Tags must be less than 15 characters',
                    })
                }

                if (!field.value.includes(tagValue as never)) {
                    form.setValue('tags', [...field.value, tagValue])
                    tagInput.value = ''
                    form.clearErrors('tags')
                }
            }
            else {
                form.trigger()
            }
        }
    }

    const handleTagRemove = (tag: string, field: any) => {

        const newTags = field.value.filter((t: string) => t !== tag)
        form.setValue('tags', newTags)
    }

    return (
        <Form {...form}>

            <h1 className='h1-bold text-dark100_light900 mb-10'>
                {type === 'create' ? 'Create Room' : 'Edit Room'}
            </h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Room Name
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Please name your room
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Description of Your Room
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Please describe your room
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Github Repo
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Please add a link to project you want to discuss
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Tags
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <>
                                    <Input
                                        disabled={type === 'edit'}
                                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                        placeholder="Add tags..."
                                        onKeyDown={(e) => {
                                            handleInputKeyDown(e, field)
                                        }}
                                    />
                                    {field.value.length > 0 && (
                                        <div className='flex-start mt-2.5 gap-2.5'>
                                            {field.value.map((tag: any) => (
                                                <Badge key={tag} className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                                                    onClick={() => {
                                                        type !== 'edit' ? (
                                                            handleTagRemove(tag, field)
                                                        ) : (
                                                            () => { }
                                                        )
                                                    }}
                                                >
                                                    {tag}
                                                    {type !== 'edit' && <Image
                                                        src={'/assets/icons/close.svg'}
                                                        alt='close'
                                                        height={12}
                                                        width={12}
                                                        className='cursor-pointer object-contain invert-0 dark:invert'
                                                    />}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add upto 3 tags to describe what your question is about. You need to press enter to add a tag
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className='primary-gradient w-fit !text-light-900'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            {type === 'edit' ? 'Editing...' : 'Creating...'}
                        </>
                    ) : (
                        <>
                            {type === 'edit' ? 'Edit Room' : 'Create Room'}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default CreateRoom