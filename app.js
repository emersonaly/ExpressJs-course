import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    `
    <h1>Curso de ExpressJS</h1>
    <p>Aplicaciones web dinamicas con express</p>
    <p>Corre en el puerto: ${PORT}</p>
    `
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
