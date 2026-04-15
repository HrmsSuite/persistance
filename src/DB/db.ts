import mongoose, { ConnectOptions } from "mongoose";
import { IDB } from "../types/size.typings";

let connectionPromise : Promise<typeof mongoose> | null = null

const connectDB = async (
    uri:string,
    options?:IDB
):Promise<typeof mongoose> => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose
        }
        const connectionOptions:ConnectOptions = {
            maxPoolSize:options?.maxPoolSize??10
        }
        if (!connectionPromise) {
             connectionPromise = mongoose.connect(uri,connectionOptions)   
        }
        await connectionPromise
        return mongoose
    } catch (error) {
        connectionPromise = null
        throw error;
    }
}

const disconnectFromDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      return;
    }

    await mongoose.connection.close(false);
    connectionPromise = null;
  } catch (error) {
    throw error;
  }
};

export { connectDB, disconnectFromDB };


