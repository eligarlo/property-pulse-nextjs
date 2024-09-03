import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import { poppins } from '@/lib/fonts'
import AuthProvider from '@/components/providers/AuthProvider'
import { GlobalProvider } from '@/context/GlobalContext'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'
import 'photoswipe/dist/photoswipe.css'

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
			<GlobalProvider>
				<html lang='en'>
					<body className={`${poppins.variable} font-sans`}>
						<Navbar />
						<main>{children}</main>
						<Footer />
						<ToastContainer />
					</body>
				</html>
			</GlobalProvider>
		</AuthProvider>
	)
}

export default RootLayout
