import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not set in environment");
        throw new Error("MONGODB_URI not set");
    }

    // Set Node's DNS servers to Google DNS to bypass ISP/local DNS that block SRV records
    try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (err) {
        console.warn("Could not set custom DNS servers, using system defaults:", err.message);
    }

    mongoose.connection.on("connected", () => {
        console.log("DB Connected");
    });

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    try {
        await mongoose.connect(uri, {
            dbName: process.env.DB_NAME || "e-commerce",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection established");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
};

export default connectDB;