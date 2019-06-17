const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const fun = require('./funciones');

// Boostrap
const dirNode_modules = path.join(__dirname, '../node_modules')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

// partials
const directoriopartials = path.join(__dirname, '../partials');
hbs.registerPartials(directoriopartials)

//incluir hbs al proyecto
app.set('view engine', 'hbs');

// direccionar al index
app.get('/', (req, res) => {
    res.render('index.hbs', {
    });
})

//helpers
require('./helpers');

// manejo metodo post
const bodyParser = require('body-parser');
const directoriopublico = path.join(__dirname, '../public');
app.use(express.static(directoriopublico));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * cursos
 */

// direccionar creación de cursos
app.get('/crearCurso', (req, res) => {
    res.render('crearCurso.hbs', {
    })
});

// direccionar listar cursos
app.get('/listarCursos', (req, res) => {
    res.render('listarCursos.hbs', {
    })
});

// Registro curso
app.post('/registrarCurso', (req, res) => {
    // Crear
    txt = fun.crear(req.body);
    res.render('mensaje.hbs', {
        mensaje: txt
    })
});

/**
 * Inscritos
 */

// direccionar inscripcion
app.get('/inscripcion', (req, res) => {
    res.render('inscripcion.hbs', {
    })
});

// registro inscripcion
app.post('/inscripcion', (req, res) => {
    // Crear
    txt = fun.inscribirse(req.body);
    res.render('msjInscripcion.hbs', {
        mensaje: txt
    })
});

// listar inscritos
app.get('/inscritos', (req, res) => {
    res.render('inscritos.hbs', {
    })
});


// On server
app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})

