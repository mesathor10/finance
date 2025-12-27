import mongoose from "mongoose";

function dbConnection() {
  mongoose
    .connect("mongodb+srv://sathishkumar4118:mesathor10@financecluster.ukshbic.mongodb.net/")
    .then((res) => console.log("Database Connected"))
    .catch((err) => console.log("Database doesn't connected", err));
}

export default dbConnection;
