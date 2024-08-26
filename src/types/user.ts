import { Types } from 'mongoose'

import { PropertyType } from '@/types/property'

export type UserType = {
	_id: string
	email: string
	username: string
	image: string
	bookmarks: Types.ObjectId | PropertyType[]
	createdAt: string
	updatedAt: string
}
