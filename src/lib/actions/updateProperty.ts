'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import connectDB from '@/config/database'
import { getPropertySizes, getSessionUser } from '@/lib/utils'
import PropertyModel from '@/db/models/Property'

const updateProperty = async (propertyId: string, formData: FormData) => {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User ID is required')
	}

	const { userId } = sessionUser

	const existingProperty = await PropertyModel.findById(propertyId)

	// Verify Ownership
	if (existingProperty.owner.toString() !== userId) {
		throw new Error('Unauthorized')
	}

	const { square_feet, square_meters } = getPropertySizes(
		formData.get('square_feet'),
		formData.get('square_meters')
	)

	const propertyData = {
		owner: userId,
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet,
		square_meters,
		amenities: formData.getAll('amenities'),
		rates: {
			nightly: formData.get('rates.nightly'),
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
		// images: [] as string[],
	}

	const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyId, propertyData)

	revalidatePath('/', 'layout')
	redirect(`/properties/${updatedProperty._id}`)
}

export default updateProperty
