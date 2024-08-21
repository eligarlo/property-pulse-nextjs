'use server'
import { revalidatePath } from 'next/cache'

import cloudinary from '@/config/cloudinary'
import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { getSessionUser } from '@/lib/utils'

const deleteProperty = async (propertyId: string) => {
	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		throw new Error('You must be logged in to delete a property')
	}

	const { userId } = sessionUser

	const property = await PropertyModel.findById(propertyId)

	if (!property) {
		throw new Error('Property not found')
	}

	// Verify ownership
	if (property.owner.toString() !== userId) {
		throw new Error('Unauthorized')
	}

	// Extract public ID from image URLs
	const publicIds = property.images.map((imageUrl: string) => {
		const parts = imageUrl.split('/')
		return parts.at(-1)?.split('.').at(0)
	})

	// Delete images from Cloudinary
	if (publicIds.length > 0) {
		for (let publicId of publicIds) {
			await cloudinary.uploader.destroy(`propertypulse/${publicId}`)
		}
	}

	// Delete property from database
	await property.deleteOne()

	revalidatePath('/', 'layout')
}

export default deleteProperty
