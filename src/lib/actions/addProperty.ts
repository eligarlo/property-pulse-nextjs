'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import connectDB from '@/config/database'
import cloudinary from '@/config/cloudinary'
import { getPropertySizes, getSessionUser } from '@/lib/utils'
import PropertyModel from '@/db/models/Property'

async function addProperty(formData: FormData) {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User ID is required')
	}

	const { userId } = sessionUser

	// Access all values from amenities
	const amenities = formData.getAll('amenities')

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
		amenities,
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
		images: [] as string[],
	}

	const imageUrls: string[] = []

	// Filter out empty images
	const images = formData
		.getAll('images')
		.filter((image): image is File => image instanceof File && image.name !== '')

	for (const imageFile of images) {
		const imageBuffer = await imageFile.arrayBuffer()
		const imageArray = Array.from(new Uint8Array(imageBuffer))
		const imageData = Buffer.from(imageArray)

		// Convert to base64
		const imageBase64 = imageData.toString('base64')

		// Upload image to Cloudinary
		const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
			folder: 'propertypulse',
		})

		imageUrls.push(result.secure_url)
	}

	propertyData.images = imageUrls

	const newProperty = new PropertyModel(propertyData)
	await newProperty.save()

	revalidatePath('/', 'layout')

	redirect(`/properties/${newProperty._id}`)
}

export default addProperty
