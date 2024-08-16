import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { PropertyType } from '@/types/property'
import PropertyHeaderImage from '@/components/ui/property/PropertyHeaderImage'
import PropertyDetails from '@/components/ui/property/PropertyDetails'

type PropertyPageProps = {
	params: {
		id: string
	}
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
	await connectDB()
	const property: PropertyType | null = await PropertyModel.findById(params.id).lean()

	if (!property) {
		return <section>Property not found</section>
	}

	return (
		<>
			<PropertyHeaderImage image={property.images[0]} />

			<section>
				<div className='container m-auto py-6 px-6'>
					<Link href='/properties' className='text-blue-500 hover:text-blue-600 flex items-center'>
						<FaArrowLeft className='mr-2' /> Back to Properties
					</Link>
				</div>
			</section>

			<section className='bg-blue-50'>
				<div className='container m-auto py-10 px-6'>
					<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
						<PropertyDetails property={property} />
					</div>
				</div>
			</section>
		</>
	)
}

export default PropertyPage
