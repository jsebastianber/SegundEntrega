const hbs = require('hbs');

// Listar cursos
hbs.registerHelper('listarCursos', (req, res) => {
    listaCursos = require('../data/listado.json');

    let texto = "", head = "";
    head = `<table class="table table-striped"> \
                    <th>Id</th>\
                    <th>Nombre</th>\
                    <th>Descripción</th>\
                    <th>Valor</th>\
                    <th>Modalidad</th>\
                    <th>Intensidad</th>\
                    <th>Estado</th>\
            `;

    listaCursos.forEach(cur => {
        texto = texto +
            "<tr>" +
            "<td>" + cur.id + "</td>" +
            "<td>" + cur.nombre + "</td>" +
            "<td>" + cur.descripcion + "</td>" +
            "<td>" + cur.valor + "</td>" +
            "<td>" + cur.modalidad + "</td>" +
            "<td>" + cur.modalidad + "</td>" +
            "<td>" + cur.estado + "</td>"
        "<\tr>"
    });
    texto = head + texto + "</table>";
    return texto;
});

// cursos para interesados
hbs.registerHelper('cursosInteresados', (req, res) => {
    listaCursos = require('../data/listado.json');

    text1 = `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;

    let text = "";
    i = 0;
    listaCursos.forEach(curso => {
        if (curso.estado == 'Disponible') {
            i++;
            text = text +
                `<div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="heading${i}">
                        <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            ${curso.id} - ${curso.nombre} <br>
                            ${curso.descripcion}
                        </a>
                        </h4>
                    </div>
                    <div id="collapse${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${i}">
                        <div class="panel-body">
                            Modalidad: ${curso.modalidad} <br>
                            Intensidad: ${curso.intensidad}
                        </div>
                    </div>
                </div>`;
        }

    });

    return text1 + text + "</div>";

});

// listado de cursos
hbs.registerHelper("obtenerCurso", function () {
    cursos = require('../data/listado.json');
    let texto = "";
    cursos.forEach(curso => {
        if (curso.estado == "Disponible") {
            texto += `<option value="${curso.id}">` + curso.nombre + `</option>`;
        }
    });
    return texto;
});


hbs.registerHelper('inscritos', (req, res) => {
    listaCursos = require('../data/listado.json');
    listaInscritos = require('../data/inscritos.json');

    let text = "", txtCollapse = "", txtDelete = "", text1 = "";
    let i = 0;

    text1 = `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;

    listaCursos.forEach(curso => {
        if (curso.estado == 'Disponible') {
            i++;
            txtCollapse =
                `<div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="heading${i}">
                        <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            ${curso.nombre} <br>
                            ${curso.descripcion}
                        </a>
                        </h4>
                    </div>
                    <div id="collapse${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${i}">
                        <div class="panel-body">`;

            let tabla = "<table class='table'>\
                            <thead>\
                                <tr>\
                                <th scope='col'>Documento</th>\
                                <th scope='col'>Nombre</th>\
                                <th scope='col'>Correo</th>\
                                <th scope='col'>Telefono</th>\
                                <th scope='col'>Acción</th>\
                                </tr>\
                            </thead>";
            let txtDelete ="";

            listaInscritos.forEach(ins => {
                if (curso.id == ins.curso) {
                    txtDelete = txtDelete +
                        `<tr>
                            <td>` + ins.identificacion + `</td>\
                            <td>` + ins.nombre + `</td>\
                            <td>` + ins.correo + `</td>\
                            <td>` + ins.telefono + `</td>\
                            <td> <button type='submit' class='btn btn-warning btn - sx'>Eliminar</button> <td>\
                        </tr>`;
                }
            })

            textEnd = `</table></div></div></div>`;

            text = (text + txtCollapse + tabla + txtDelete + textEnd);
        }

    });

    return text1 + text + "</div>";

});