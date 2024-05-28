import app from "./app/app.js";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 666;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log('JWT_SECRET:', process.env.JWT_SECRET);
