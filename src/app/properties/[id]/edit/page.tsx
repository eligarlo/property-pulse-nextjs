import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { PropertyType } from '@/types/property'
import { convertToSerializableObject } from '@/lib/utils'
import PropertyEditForm from '@/components/forms/PropertyEditForm'

type EditPropertyPageProps = {
	params: {
		id: string
	}
}

const EditPropertyPage = async ({ params }: EditPropertyPageProps) => {
	await connectDB()

	const propertyDoc = await PropertyModel.findById(params.id).lean()

	if (!propertyDoc || Array.isArray(propertyDoc)) {
		return <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
	}

	const property = convertToSerializableObject(propertyDoc) as PropertyType

	return (
		<section className='bg-blue-50'>
			<div className='container m-auto max-w 2xl py-24'>
				<div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
					<PropertyEditForm property={property} />
				</div>
			</div>
		</section>
	)
}

export default EditPropertyPage
