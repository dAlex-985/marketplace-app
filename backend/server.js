import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `A szerver sikeresen elindult a ${PORT}-es port ${process.env.NODE_ENV} módban.`,
  );
});
