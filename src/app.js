
import e from 'express';
import  express  from 'express';
import cors from 'cors';

const app = express();

// Basic onfiguration
// Middleware

app.use(express.json({limit: "16kb"})); 
// for parsing application/json upto 16kb data

app.use(express.urlencoded({ extended: true, limit: "16kb" })); 
// for parsing application/x-www-form-urlencoded upto 16kb data

app.use(express.static('public'));
// for serving static files from the 'public' directory


// cors configuration to handle url from env variable and allow credentials and specific methods and headers
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// import routes
import healthCheckRouter from "./routes/healthCheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.get('/', (req, res) => {
    res.send('Hello World!')
})
export default app