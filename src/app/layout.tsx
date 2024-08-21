import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import { poppins } from '@/lib/fonts'
import AuthProvider from '@/components/providers/AuthProvider'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Property Pulse',
	keywords: 'Property, Real Estate, Buy, Sell, Rent, Invest',
	description: 'Find the perfect rental property or buy your dream home',
}

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className={`${poppins.variable} font-sans`}>
					<Navbar />
					<main>{children}</main>
					<Footer />
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	)
}

export default RootLayout
