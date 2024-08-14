import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
	// Ensure only fields in schema are saved to database
	mongoose.set('strictQuery', true)

	// If the database is already connected, don't connect again
	if (connected) {
		console.log('Database is already connected')
		return
	}

	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.MONGODB_URI as string)
		console.log('Database connected')
		connected = true
	} catch (error) {
		console.error(`Error connecting to database: ${error}`)
	}
}

export default connectDB
