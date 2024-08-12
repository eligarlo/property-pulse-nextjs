type PropertyPageProps = {
	params: {
		id: string
	}
}

const PropertyPage = ({ params }: PropertyPageProps) => {
	return <div>Property Page {params.id}</div>
}

export default PropertyPage
