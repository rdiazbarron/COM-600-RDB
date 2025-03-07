const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile('bienvenido.html', { root: __dirname + '/public' });
});
app.get('/listar', (req, res) => {
  db.query('SELECT id, nombres, apellidos, telefono, direccion FROM agenda', (error, contactos) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          return res.status(500).send("Error al obtener contactos");
      }


      res.render('listar', { contactos });
  });
});


app.get('/add', (req, res) => {
    res.render('add');
  });

app.post('/add', (req, res) => {
    const { nombres,apellidos,direccion,telefono } = req.body;
    db.query('INSERT INTO agenda (nombres,apellidos,telefono,direccion) VALUES (?, ?, ?, ?)', [nombres,apellidos,telefono,direccion], (error, resultado) => {
        if (error) {
            console.log('Error al insertar el producto');
            return;
        }
        res.redirect('/listar');
    }); 
});
// Mostrar formulario para editar producto
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombres,apellidos,direccion,telefono FROM agenda WHERE id = ?', [id], (error, contactos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', { contacto: contactos[0] });
    });
});
// Actualizar el producto en la base de datos
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombres,apellidos,direccion,telefono } = req.body;
    db.query('UPDATE agenda SET nombres = ?, apellidos = ?, telefono = ?, direccion = ? WHERE id = ?', [nombres, apellidos, telefono, direccion, id], (error, resultado) => {
        if (error) {
            console.log('Error al actualizar la agenda');
            return;
        }
        res.redirect('/listar');
    });
});

// Eliminar contacto
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM agenda WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el contacto');
            return;
        }
        res.redirect('/listar');
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
  