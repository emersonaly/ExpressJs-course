import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    `
    <h1>Curso de ExpressJS</h1>
    <p>Aplicaciones web dinamicas con express</p>
    <p>Corre en el puerto: ${PORT}</p>
    `
  );
});

app.get('/users/:id', (req,res) => {
  const userId = req.params.id; // obtenemos el parametro de la ruta :id

  res.send(`Usuario encontrado: ${userId}`)
})

app.get('/search', (req, res) => {
  // obtenemos los parametros de la consulta 
  const term = req.query.term || 'no envio termino de busqueda'
  const category = req.query.category || 'no envio categoria'
  
  res.send(`<h2>Resultados de la busqueda</h2> 
    <p>Busqueda: <strong>${term}</strong></p> 
    <p>Categoria: <strong>${category}</strong></p> `)
})

app.post('/form', (req,res) => {
  const name = req.body.name || 'no envio name';
  const email = req.body.email || 'no envio email';
  
  res.json({message: 'Formulario recibido', 
    data: {
      name, 
      email
    }})
})

app.post('/api/data', (req,res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'No se recibio data' })
  }

  res.status(201).json({
    message: 'Data recibida correctamente',
    data: data
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
