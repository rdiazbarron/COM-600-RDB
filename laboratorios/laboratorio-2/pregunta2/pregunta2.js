const express = require('express');
const bodyParser = require('body-parser');
const getDb = require('./database');
const db = getDb();

const app = express();
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile('bienvenido.html', { root: __dirname + '/public' });
});
app.get('/listar', (req, res) => {
  db.query('SELECT id, nombre, correo_electronico, fecha_registro, correo_electronico FROM usuarios', (error, usuarios) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          return res.status(500).send("Error al obtener usuarios");
      }


      res.render('listar', { usuarios });
  });
});


app.get('/add', (req, res) => {
    res.render('add');
  });

app.post('/add', (req, res) => {
    const { nombre,correo_electronico,fecha_registro } = req.body;
    db.query('INSERT INTO usuarios (nombre, fecha_registro,correo_electronico) VALUES (?, ?, ?)', [nombre,fecha_registro,correo_electronico], (error, resultado) => {
        if (error) {
            console.log('Error al insertar el usuario');
            return;
        }
        res.redirect('/listar');
    }); 
});
// Mostrar formulario para editar usuario
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombre,correo_electronico,fecha_registro FROM usuarios WHERE id = ?', [id], (error, usuarios) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', { contacto: usuarios[0] });
    });
});
// Actualizar el usuario en la base de datos
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombre,correo_electronico,fecha_registro } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, = ?, fecha_registro = ?, correo_electronico = ? WHERE id = ?', [nombre, fecha_registro, correo_electronico, id], (error, resultado) => {
        if (error) {
            console.log('Error al actualizar usuarios');
            return;
        }
        res.redirect('/listar');
    });
});

// Eliminar contacto
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el usuario');
            return;
        }
        res.redirect('/listar');
    });
});

// Iniciar servidor
app.listen( port, () => {
    //console.log('Servidor corriendo en http://localhost:3005');
  });
  