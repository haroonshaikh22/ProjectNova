
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";



dotenv.config({
    path: "./.env"
});





const port = process.env.PORT || 3000


connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with failure
});

