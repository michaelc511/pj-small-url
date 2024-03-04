import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from  "./routes/urlRoute";      
// import route from "./routes/userRoute";

const app: Express = express();
app.use(bodyParser.json());

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
// app.use("/api/user", route);

// import express, { Express, Application , Request, Response } from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// // import route from "./routes/userRoute";

// const app: Application = express();

// dotenv.config();
// const port: string | number = process.env.PORT  ;

// app.get("/", (req: Request, res:Response) => {
//   res.send("Hello World24!");
// });

// app.listen(port, () => {
//   console.log(
//     `Example app listening at http://localhost:${port}`
//   );
// });
