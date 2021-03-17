//alert('conecta con el html');
recuperarComboTipoEmpuje();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_empuje: (document.getElementById('codigo_empuje').value === '' ? 0 : document.getElementById('codigo_empuje').value),
        descripcion: document.getElementById('descripcion_empuje').value,
        cod_tipo: document.getElementById('menuEmpuje').value,
        matricula: document.getElementById('matricula_embarcacion').value,
        letras: document.getElementById('letras_embarcacion').value,
        eslora: document.getElementById('eslora_embarcacion').value,
        manga: document.getElementById('manga_embarcacion').value,
        puntal: document.getElementById('puntal_embarcacion').value,
        calado: document.getElementById('calado_embarcacion').value,
        cod_nacionalidad: document.getElementById('codigo_nacionalidad').value,
        cod_empresa: document.getElementById('codigo_empresa').value

    };
//    alert ("Código: "+ document.getElementById('cod_ciudad').value);
//    alert ("Descripcion: "+ document.getElementById('cod_ciudad').value);

    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/EmpujeCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}

function agregarEmpuje() {
    var verificar_descripcion = $('#descripcion_empuje').val();
    var verificar_matricula = $('#matricula_embarcacion').val();
    var verificar_letras = $('#letras_embarcacion').val();
    var verificar_eslora = $('#eslora_embarcacion').val();
    var verificar_manga = $('#manga_embarcacion').val();
    var verificar_puntal = $('#puntal_embarcacion').val();
    var verificar_calado = $('#calado_embarcacion').val();
    var verificar_tipo_empuje = $('#menuEmpuje').val();
    var verificar_bandera = $('#codigo_nacionalidad').val();
    var verificar_empresa = $('#codigo_empresa').val();
    if (verificar_descripcion.length === 0 || verificar_matricula.length === 0
            || verificar_letras.length === 0 || verificar_eslora.length === 0
            || verificar_manga.length === 0 || verificar_puntal.length === 0
            || verificar_calado.length === 0 || verificar_tipo_empuje.length === 0
            || verificar_bandera.length === 0 || verificar_empresa.length === 0) {
        alert('Debe completar todos los datos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarEmpuje() {
    var verificar_descripcion = $('#descripcion_empuje').val();
    var verificar_matricula = $('#matricula_embarcacion').val();
    var verificar_letras = $('#letras_embarcacion').val();
    var verificar_eslora = $('#eslora_embarcacion').val();
    var verificar_manga = $('#manga_embarcacion').val();
    var verificar_puntal = $('#puntal_embarcacion').val();
    var verificar_calado = $('#calado_embarcacion').val();
    var verificar_tipo_empuje = $('#menuEmpuje').val();
    var verificar_bandera = $('#codigo_nacionalidad').val();
    var verificar_empresa = $('#codigo_empresa').val();
    var verificar_codigo = $('#codigo_empuje').val();

    if (verificar_descripcion.length === 0 || verificar_matricula.length === 0
            || verificar_letras.length === 0 || verificar_eslora.length === 0
            || verificar_manga.length === 0 || verificar_puntal.length === 0
            || verificar_calado.length === 0 || verificar_tipo_empuje.length === 0
            || verificar_bandera.length === 0 || verificar_empresa.length === 0
            || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarEmpuje() {
    var verificar_codigo = $('#codigo_empuje').val();
    if (verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarEmpuje() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/EmpujeCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_empuje').value = json[i].descripcion;
                document.getElementById('menuEmpuje').value = json[i].cod_tipo;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_empuje:
                document.getElementById('codigo_empuje').value}));
    document.getElementById("descripcion_empuje").focus();
}

function mostrarNacionalidad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/NacionalidadCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarNacionalidad(" + json[i].cod_nacionalidad + " ,\n\
'" + json[i].descripcion + "', \n\
'codigo_nacionalidad' , \n\
'nacionalidad') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaBandera").innerHTML = filas;
            document.getElementById('datos_AbuscarBandera').style.display = 'block';
            document.getElementById("filtro_buscadorBandera").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarNacionalidad(cod_nacionalidad, descripcion_nacionalidad,
        codigo_nacionalidad, nacionalidad) {
    document.getElementById(codigo_nacionalidad).value = cod_nacionalidad;
    document.getElementById(nacionalidad).value = descripcion_nacionalidad;
    document.getElementById('nacionalidad').focus();
    document.getElementById('datos_AbuscarBandera').style.display = 'none';
}

function mostrarEmpresa() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpresaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_empresa + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarEmpresa(" + json[i].cod_empresa + " ,\n\
'" + json[i].descripcion + "', \n\
'codigo_empresa' , \n\
'empresa') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaEmpresa").innerHTML = filas;
            document.getElementById('datos_AbuscarEmpresa').style.display = 'block';
            document.getElementById("filtro_buscadorEmpresa").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarEmpresa(cod_empresa, descripcion_empresa,
        codigo_empresa, empresa) {
    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(empresa).value = descripcion_empresa;
    document.getElementById('empresa').focus();
    document.getElementById('datos_AbuscarEmpresa').style.display = 'none';
}

function mostrarTablaEmpuje() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpujeCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_empuje + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_empuje + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
//                filas += "<td>" + json[i].cod_tipo + "</td>";
                filas += "<td>" + json[i].descripcion_tipo + "</td>";
                filas += "<td>" + json[i].matricula + "</td>";
                filas += "<td>" + json[i].letras + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_empuje + " ,\n\
'" + json[i].descripcion + "' , \n\
'" + json[i].matricula + "',\n\
'" + json[i].letras + "',\n\
'" + json[i].eslora + "',\n\
'" + json[i].manga + "',\n\
'" + json[i].puntal + "',\n\
'" + json[i].calado + "',\n\
'" + json[i].cod_tipo + "',\n\
'" + json[i].descripcion_tipo + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].descripcion_nacionalidad + "',\n\
'" + json[i].cod_empresa + "',\n\
'" + json[i].descripcion_empresa + "',\n\
'codigo_empuje' , \n\
'descripcion_empuje',\n\
'matricula_embarcacion',\n\
'letras_embarcacion',\n\
'eslora_embarcacion',\n\
'manga_embarcacion',\n\
'puntal_embarcacion',\n\
'calado_embarcacion',\n\
'menuEmpuje',\n\
'codigo_nacionalidad',\n\
'nacionalidad',\n\
'codigo_empresa',\n\
'empresa')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaEmpuje").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Empuje").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarComboTipoEmpuje() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpujeCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_tipo + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuEmpuje").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function buscador(filtro, tabla) {
    var input, filter, table, tr, td, i;
    input = document.getElementById(filtro);
    filter = input.value.toUpperCase();
    table = document.getElementById(tabla);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        visible = false;
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                visible = true;
            }
        }
        if (visible === true) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function recuperarDeBuscador(cod_empuje, descripcion, matricula, letras, eslora, manga, puntal, calado, cod_tipo, descripcion_tipo, cod_nacionalidad, descripcion_nacionalidad, cod_empresa, descripcion_empresa,
        codigo_empuje, descripcion_empuje, matricula_embarcacion, letras_embarcacion, eslora_embarcacion, manga_embarcacion, puntal_embarcacion, calado_embarcacion, menuEmpuje, codigo_nacionalidad, nacionalidad, codigo_empresa, empresa) {

    document.getElementById(codigo_empuje).value = cod_empuje;
    document.getElementById(descripcion_empuje).value = descripcion;
    document.getElementById(matricula_embarcacion).value = matricula;
    document.getElementById(letras_embarcacion).value = letras;
    document.getElementById(eslora_embarcacion).value = eslora;
    document.getElementById(manga_embarcacion).value = manga;
    document.getElementById(puntal_embarcacion).value = puntal;
    document.getElementById(calado_embarcacion).value = calado;
    document.getElementById(menuEmpuje).value = cod_tipo;
    document.getElementById(codigo_nacionalidad).value = cod_nacionalidad;
    document.getElementById(nacionalidad).value = descripcion_nacionalidad;
    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(empresa).value = descripcion_empresa;

    document.getElementById(descripcion_empuje).disabled = false;
    document.getElementById(matricula_embarcacion).disabled = false;
    document.getElementById(letras_embarcacion).disabled = false;
    document.getElementById(eslora_embarcacion).disabled = false;
    document.getElementById(manga_embarcacion).disabled = false;
    document.getElementById(puntal_embarcacion).disabled = false;
    document.getElementById(calado_embarcacion).disabled = false;
    document.getElementById(menuEmpuje).disabled = false;
    document.getElementById(codigo_nacionalidad).disabled = false;
    document.getElementById(codigo_empresa).disabled = false;
    document.getElementById(descripcion_empuje).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarEmpuje() {

    document.getElementById("codigo_empuje").disabled = true;
    document.getElementById("descripcion_empuje").disabled = true;
    document.getElementById("matricula_embarcacion").disabled = true;
    document.getElementById("letras_embarcacion").disabled = true;
    document.getElementById("eslora_embarcacion").disabled = true;
    document.getElementById("manga_embarcacion").disabled = true;
    document.getElementById("puntal_embarcacion").disabled = true;
    document.getElementById("calado_embarcacion").disabled = true;
    document.getElementById("menuEmpuje").disabled = true;
    document.getElementById("codigo_nacionalidad").disabled = true;
    document.getElementById("nacionalidad").disabled = true;
    document.getElementById("codigo_empresa").disabled = true;
    document.getElementById("empresa").disabled = true;

    document.getElementById("form_empuje").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputEmpuje(descripcion_empuje, matricula_embarcacion, letras_embarcacion, eslora_embarcacion,
        manga_embarcacion, puntal_embarcacion, calado_embarcacion, menuEmpuje, codigo_nacionalidad, codigo_empresa)
{
    var descripcion = document.getElementById(descripcion_empuje);
    var matricula = document.getElementById(matricula_embarcacion);
    var letras = document.getElementById(letras_embarcacion);
    var eslora = document.getElementById(eslora_embarcacion);
    var manga = document.getElementById(manga_embarcacion);
    var puntal = document.getElementById(puntal_embarcacion);
    var calado = document.getElementById(calado_embarcacion);
    var tipo = document.getElementById(menuEmpuje);
    var bandera = document.getElementById(codigo_nacionalidad);
    var empresa = document.getElementById(codigo_empresa);

    descripcion.disabled = !descripcion.disabled;
    matricula.disabled = !matricula.disabled;
    letras.disabled = !letras.disabled;
    eslora.disabled = !eslora.disabled;
    manga.disabled = !manga.disabled;
    puntal.disabled = !puntal.disabled;
    calado.disabled = !calado.disabled;
    tipo.disabled = !tipo.disabled;
    bandera.disabled = !bandera.disabled;
    empresa.disabled = !empresa.disabled;

    document.getElementById(descripcion_empuje).focus();
}