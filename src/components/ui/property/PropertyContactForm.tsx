'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import addMessage from '@/lib/actions/addMessage'
import { PropertyType } from '@/types/property'
import PropertyContactFormSubmitButton from '@/components/ui/property/PropertyContactFormSubmitButton'

type PropertyContactFormProps = {
	property: PropertyType
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
	const { data: session } = useSession()

	const [state, formAction] = useFormState(addMessage, {
		submitted: false,
		message: '',
		error: false,
	})

	useEffect(() => {
		if (state.error) {
			toast.error(state.message)
		}

		if (state.submitted) {
			toast.success(state.message)
		}
	}, [state])

	if (state.submitted) {
		return <p className='text-green-500 mb4'>{state.message}</p>
	}

	return (
		session && (
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
				<form action={formAction}>
					{/* Hidden inputs */}
					<input type='hidden' id='property' name='property' defaultValue={property._id} />
					<input
						type='hidden'
						id='recipient'
						name='recipient'
						defaultValue={property.owner.toString()}
					/>

					{/* Form fields */}
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
							Name:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='name'
							name='name'
							type='text'
							placeholder='Enter your name'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
							Email:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							name='email'
							type='email'
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
							Phone:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='phone'
							name='phone'
							type='text'
							placeholder='Enter your phone number'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='body'>
							Message:
						</label>
						<textarea
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
							id='body'
							name='body'
							placeholder='Enter your message'
						></textarea>
					</div>
					<div>
						<PropertyContactFormSubmitButton />
					</div>
				</form>
			</div>
		)
	)
}

export default PropertyContactForm
