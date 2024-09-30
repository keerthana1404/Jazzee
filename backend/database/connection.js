import mongoose from "mongoose";

export const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL"
}).then(()=>{
    console.log("connected to db")
}).catch(err=>{
    console.log(`error occured ${err}`)
})
}