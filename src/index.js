import app from "./app.js";
import dotenv from 'dotenv';
import { connectDB } from "./db.js";

connectDB()

dotenv.config()


app.get("/", (req, res) => {
  res.send("Server is runing");
});

const PORT = process.env.PORT || 3000;
    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
