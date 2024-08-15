import { Types } from 'mongoose'

export type PropertyType = {
	_id: string
	owner: Types.ObjectId
	name: string
	type: string
	description: string
	location: {
		street: string
		city: string
		state: string
		zipcode: string
	}
	beds: number
	baths: number
	square_feet: number
	square_meters: number
	amenities: string[]
	rates: {
		nightly: number
		weekly: number
		monthly: number
	}
	seller_info: {
		name: string
		email: string
		phone: string
	}
	images: string[]
	is_featured: boolean
	createdAt: string
	updatedAt: string
}
