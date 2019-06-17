const fs = require('fs');
listaCursos = [];
listaInscritos = [];

// CURSOS
const crear = (req) => {
    listar();

    curso = {
        id: req.id,
        nombre: req.nombre,
        descripcion: req.descripcion,
        valor: req.valor,
        modalidad: req.modalidad,
        intensidad: req.intensidad,
        estado: 'Disponible'
    };

    let duplicado = listaCursos.find(cur => cur.id == curso.id);

    if (!duplicado) {
        listaCursos.push(curso);
        guardar();
        return "El curso ha sido creado";
    } else {
        return "Ya existe, no será creado";
    }

}

const listar = () => {
    try {
        listaCursos = require('../data/listado.json');
    } catch (error) {
        listaCursos = [];
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./data/listado.json', datos, (error) => {
        if (error) throw (error);
    });
}

// Aspirantes
const listarInscritos = () => {
    try {
        listaInscritos = require('../data/inscritos.json');
    } catch (error) {
        listaInscritos = [];
    }
}

const inscribirse = (req) => {
    listarInscritos();

    inscrito = {
        identificacion: req.identificacion,
        nombre: req.nombre,
        correo: req.correo,
        telefono: req.telefono,
        curso: req.curso
    }

    let duplicado = listaInscritos.find(ins => ins.identificacion == inscrito.identificacion && ins.curso == inscrito.curso);

    if (!duplicado) {
        listaInscritos.push(inscrito);
        guardarInscripcion();
        return "Inscripción completada " ;
    } else {
        return "Ya existe esta combinación, no será inscrito";
    }
}

const guardarInscripcion = () => {
    let datos = JSON.stringify(listaInscritos);
    fs.writeFile('./data/inscritos.json', datos, (error) => {
        if (error) throw (error);
    });
}

module.exports = {
    crear,
    inscribirse
}