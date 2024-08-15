import { Schema, model, models } from 'mongoose'
import { PropertyType } from '@/types/property'

const PropertySchema = new Schema<PropertyType>(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		location: {
			street: String,
			city: String,
			state: String,
			zipcode: String,
		},
		beds: {
			type: Number,
			required: true,
		},
		baths: {
			type: Number,
			required: true,
		},
		square_feet: {
			type: Number,
			required: true,
		},
		square_meters: {
			type: Number,
			required: true,
		},
		amenities: [
			{
				type: String,
			},
		],
		rates: {
			nightly: Number,
			weekly: Number,
			monthly: Number,
		},
		seller_info: {
			name: String,
			email: String,
			phone: String,
		},
		images: [
			{
				type: String,
			},
		],
		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

const PropertyModel = models.Property || model<PropertyType>('Property', PropertySchema)

export default PropertyModel
