import app from "./app.js";
import dotenv from "dotenv";
import { supabase } from "./db.js";

dotenv.config();

async function checkDatabase() {
  try {
    const { error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    console.log("Conexión exitosa a la base de datos");
  } catch (err) {
    console.error("Error al conectar a la base de datos", err);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("Server is runing");
});

;(async () => {
  await checkDatabase();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
