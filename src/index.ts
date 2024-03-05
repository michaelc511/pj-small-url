import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from  "./routes/urlRoute";      
import cors from "cors";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));

dotenv.config();

const PORT: string | number = process.env.PORT || 5001;
const MONGOURL: string = process.env.MONGO_URL as string;

console.log('port', PORT, MONGOURL);

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected Successfully.")
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`)
    })
}).catch(error => console.log(error));

app.use("/api/url", route); 