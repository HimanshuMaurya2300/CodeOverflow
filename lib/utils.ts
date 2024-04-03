import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import { BADGE_CRITERIA } from "@/constants"
import { BadgeCounts } from "@/types"
import { auth } from "@clerk/nextjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimeStamp = (createdAt: Date): string => {

  const now = new Date()
  const timeDifference = now.getTime() - createdAt.getTime()

  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = 365 * day

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000)
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
  }
  else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  }
  else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  }
  else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  }
  else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  }
  else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }
  else {
    const years = Math.floor(timeDifference / year)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}


export const formatAndDivideNumber = (num: number): string => {

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  else {
    return num.toString()
  }
}


export const getJoinedDate = (date: Date): string => {

  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  const joinedDate = `${month} ${year}`

  return joinedDate
}


interface UrlQUeryParams {
  params: string
  key: string
  value: string
}

export const formUrlQuery = ({ params, key, value }: UrlQUeryParams) => {

  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  }, {
    skipNull: true
  })
}


interface RemoveUrlQUeryParams {
  params: string
  keysToRemove: string[]
}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQUeryParams) => {

  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => delete currentUrl[key])

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  }, {
    skipNull: true
  })
}


interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA
    count: number
  }[]
}

export const assignBadges = (params: BadgeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0
  }

  const { criteria } = params

  criteria.forEach((item) => {
    const { type, count } = item
    const badgeLevels: any = BADGE_CRITERIA[type]

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1
      }
    })
  })

  return badgeCounts
}


export const getSession = () => {
  // const { userId: clerkId } = auth()
  const clerkId = '12345'
  return clerkId
}