import "dotenv/config";
import mongoose from "mongoose";

import app from "./app.js";

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Sikeres MongoDB kapcsolat.");
  })
  .catch((err) => {
    console.error("Adatbázis-kapcsolódási hiba:", err.message);
  });

app.listen(PORT, () => {
  console.log(
    `A szerver sikeresen elindult a ${PORT}-es port ${process.env.NODE_ENV} módban.`,
  );
});
