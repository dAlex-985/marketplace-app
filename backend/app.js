import express from "express";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

// bejövő JSON kérések törzsének (req.body) feldolgozása/értelmezése
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Marketplace API fut és elérhető!",
  });
});

//Az app.all('*') minden HTTP metódusra (GET, POST, PATCH, DELETE) és minden elérési útra illeszkedik, ami feljebb nem talált gazdára.
app.use((req, res, next) => {
  // Ha a next metódusnak bármilyen paramétert adunk – jelen esetben a friss new AppError(...) példányunkat –, az Express azonnal megszakítja a normál futási láncot, átugorja az összes többi middleware-t, és egyenesen a központi hibakezelőre ugrik
  next(
    new AppError(
      `A keresett útvonal ${req.originalUrl} nem található a szerveren`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

export default app;
