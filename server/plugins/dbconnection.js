
import mongoose from 'mongoose';

export default async () => {
    const config = useRuntimeConfig()
    try {
        const DB_OPTIONS = {
            dbName: config.dbName,
            user: config.DBUSERNAME,
            pass: config.DBPASSWORD,
            authSource: config.DBAUTHSOURCE,

        }
        await mongoose.connect(config.dburl, DB_OPTIONS)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}