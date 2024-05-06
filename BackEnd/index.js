import app from "./app/app.js";
import colors from "colors";
import { config } from "dotenv";  

config();

let port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`.rainbow.italic);
});