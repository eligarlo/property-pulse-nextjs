import { Types } from 'mongoose'

import { PropertyType } from '@/types/property'
import { UserType } from '@/types/user'

export type MessageType = {
	_id: string
	sender: Pick<UserType, 'username'>
	property: Pick<PropertyType, 'name'>
	name: string
	body: string
	email: string
	phone: string
	read: boolean
	createdAt: string
	updatedAt: string
}
