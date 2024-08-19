import Image from 'next/image'

type PropertyHeaderImageProps = {
	image: string
}

const PropertyHeaderImage = ({ image }: PropertyHeaderImageProps) => {
	return (
		<section>
			<div className='container-xl m-auto'>
				<div className='grid grid-cols-1'>
					<Image
						src={image}
						alt='Property Image'
						className='object-cover h-[400px] w-full'
						width={0}
						height={0}
						sizes='100vw'
						quality={100}
					/>
				</div>
			</div>
		</section>
	)
}

export default PropertyHeaderImage
