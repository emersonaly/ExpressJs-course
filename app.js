import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { validateCreateUser, validateUpdateUser, checkValidationErrors } from './validators.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const usersFilePath = path.join(__dirname, 'users.json');


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

app.get('/users', (req,res) => {
  try {
      fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error al leer usuarios: ", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
    const users = JSON.parse(data);
    console.log(users);
    res.json(users);
  })
  }
  catch{
    console.error("Error al leer usuarios: ", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }

})

app.post('/users', validateCreateUser, checkValidationErrors, (req, res) => {

  const newUser = req.body;

  // 3. Manejo de archivos leemos el archivo de users.json y agregamos el nuevo usuario OJO
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error al leer:", err);
      return res.status(500).json({ error: "Error al leer la base de datos" });
    }

    try {
      const users = JSON.parse(data);
      // Verificamos que el usuario no exista
      const userExists = users.find(user => user.id === newUser.id);
      if (userExists) {
        return res.status(400).json({ error: "Usuario ya existe" });
      }
      users.push(newUser);

      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error("Error al escribir:", err);
          return res.status(500).json({ error: "Error al guardar el usuario" });
        }
        res.status(201).json({ message: "Usuario creado", user: newUser });
      });
    } catch (parseError) {
      res.status(500).json({ error: "Error al procesar el archivo JSON" });
    }
  });
});

// version original
// app.post('/users', (req,res) => {
//   const newUser = req.body;
// // Definimos las reglas de forma declarativa
//   body('id').isNumeric().withMessage('Id debe ser un número'),
//   body('name').trim().isLength({ min: 4 }).withMessage('Nombre muy corto'),
//   body('email').isEmail().withMessage('Email inválido')
//   try {
//     fs.readFile(usersFilePath, 'utf-8', (err, data) => {
//       if (err) {
//         console.error("Error al leer usuarios: ", err);
//         res.status(500).json({ error: "Error interno del servidor" });
//       }
//       const users = JSON.parse(data);
//       users.push(newUser);
//       fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
//         if (err) {
//           console.error("Error al escribir usuarios: ", err);
//           res.status(500).json({ error: "Error interno del servidor" });
//         }
//         res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
//       })
//     })
//   }
//   catch {
    
//   }

// })

app.put('/users/:id', validateUpdateUser, checkValidationErrors, (req,res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error al leer:", err);
      return res.status(500).json({ error: "Error al leer la base de datos" });
    }
    try {
        let users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.id === userId);
        if(userIndex === -1){
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Solo actualizamos los datos que se envian en el body, no sobrescribimos el id
        const { id, ...restOfData } = req.body;
        const userToUpdate = { ...users[userIndex], ...restOfData };
        users[userIndex] = userToUpdate;

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.error("Error al actualizar:", err);
            return res.status(500).json({ error: "Error al actualizar el usuario" });
          }
          res.status(200).json({ message: "Usuario actualizado", user: userToUpdate });
        });
    }
    catch (parseError) {
      res.status(500).json({ error: "Error al procesar el archivo JSON" });
    }
  });
})

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer la base de datos" });
    }

    try {
      let users = JSON.parse(data);
      let usersFiltered = users.filter(u => u.id !== userId);

      fs.writeFile(usersFilePath, JSON.stringify(usersFiltered, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al guardar los cambios" });
        }
        res.status(204).send();
      });
    } catch (parseError) {
      res.status(500).json({ error: "Error al procesar el archivo JSON" });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
