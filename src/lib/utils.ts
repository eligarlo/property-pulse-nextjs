import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/authOptions'

export const getSessionUser = async () => {
	// @ts-ignore
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		console.log('No session or user found')
		return null
	}

	return {
		// @ts-ignore
		userId: session.user.id,
		user: session.user,
	}
}

export const getPropertySizes = (
	sqft: FormDataEntryValue | null,
	sqm: FormDataEntryValue | null
) => {
	const propertySizes = {
		square_feet: Number(sqft),
		square_meters: Number(sqm),
	}

	// If user preference is set to metric
	if (!sqft) {
		propertySizes.square_feet = Math.round(Number(sqm) * 10.7639)
	}

	// If user preference is set to imperial
	if (!sqm) {
		propertySizes.square_meters = Math.round(Number(sqft) / 10.7639)
	}

	return propertySizes
}
