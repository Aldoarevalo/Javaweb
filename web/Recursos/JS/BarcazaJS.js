function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_barcaza: (document.getElementById('codigo_barcaza').value === '' ? 0 : document.getElementById('codigo_barcaza').value),
        descripcion: document.getElementById('descripcion_barcaza').value,
        matricula: document.getElementById('matricula_barcaza').value,
        arqueo_bruto: document.getElementById('arqueobruto_barcaza').value,
        arqueo_neto: document.getElementById('arqueoneto_barcaza').value,
        eslora: document.getElementById('eslora_barcaza').value,
        puntal: document.getElementById('puntal_barcaza').value,
        manga: document.getElementById('manga_barcaza').value,
        codigo: document.getElementById('codigo_tipobarcaza').value,
        cod_nacionalidad: document.getElementById('codigo_bandera').value,
        cod_empresa: document.getElementById('codigo_empresa').value

    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/BarcazaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarBarcaza() {
    var verificar_descripcion = $('#descripcion_barcaza').val();
    var verificar_matricula = $('#matricula_barcaza').val();
    var verificar_arqueobruto = $('#arqueobruto_barcaza').val();
    var verificar_arqueoneto = $('#arqueoneto_barcaza').val();
    var verificar_eslora = $('#eslora_barcaza').val();
    var verificar_puntal = $('#puntal_barcaza').val();
    var verificar_manga = $('#manga_barcaza').val();
    var verificar_bandera = $('#codigo_bandera').val();
    var verificar_tipobarcaza = $('#codigo_tipobarcaza').val();
    var verificar_empresa = $('#codigo_empresa').val();
    if (verificar_descripcion.length === 0 || verificar_matricula.length === 0
            || verificar_arqueobruto.length === 0 || verificar_arqueoneto.length === 0
            || verificar_eslora.length === 0 || verificar_puntal.length === 0
            || verificar_manga.length === 0 || verificar_tipobarcaza.length === 0 
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

function modificarBarcaza() {
    var verificar_descripcion = $('#descripcion_barcaza').val();
    var verificar_matricula = $('#matricula_barcaza').val();
    var verificar_arqueobruto = $('#arqueobruto_barcaza').val();
    var verificar_arqueoneto = $('#arqueoneto_barcaza').val();
    var verificar_eslora = $('#eslora_barcaza').val();
    var verificar_puntal = $('#puntal_barcaza').val();
    var verificar_manga = $('#manga_barcaza').val();
    var verificar_bandera = $('#codigo_bandera').val();
    var verificar_tipobarcaza = $('#codigo_tipobarcaza').val();
    var verificar_empresa = $('#codigo_empresa').val();
    var verificar_codigo = $('#codigo_barcaza').val();

    if (verificar_descripcion.length === 0 || verificar_matricula.length === 0
            || verificar_arqueobruto.length === 0 || verificar_arqueoneto.length === 0
            || verificar_eslora.length === 0 || verificar_puntal.length === 0
            || verificar_manga.length === 0 || verificar_tipobarcaza.length === 0 
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

function eliminarBarcaza() {
    var verificar_codigo = $('#codigo_barcaza').val();
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

function mostrarTablaBarcaza() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/BarcazaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
//            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
//                opcionL += "<option value= " + json[i].cod_empuje + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_barcaza + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].tipo_barcaza + "</td>";
                filas += "<td>" + json[i].matricula + "</td>";
                filas += "<td>" + json[i].nacionalidad + "</td>";
                filas += "<td>" + json[i].empresa + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_barcaza + " ,\n\
'" + json[i].descripcion + "' , \n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].nacionalidad + "',\n\
'" + json[i].codigo + "',\n\
'" + json[i].tipo_barcaza + "',\n\
'" + json[i].matricula + "',\n\
'" + json[i].arqueo_bruto + "',\n\
'" + json[i].arqueo_neto + "',\n\
'" + json[i].eslora + "',\n\
'" + json[i].puntal + "',\n\
'" + json[i].manga + "',\n\
'" + json[i].cod_empresa + "',\n\
'" + json[i].empresa + "',\n\
'codigo_barcaza' , \n\
'descripcion_barcaza',\n\
'codigo_bandera',\n\
'descripcion_bandera',\n\
'codigo_tipobarcaza',\n\
'descripcion_tipobarcaza',\n\
'matricula_barcaza',\n\
'arqueobruto_barcaza',\n\
'arqueoneto_barcaza',\n\
'eslora_barcaza',\n\
'puntal_barcaza',\n\
'manga_barcaza',\n\
'codigo_empresa',\n\
'descripcion_empresa')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaBarcaza").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Barcaza").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_barcaza, descripcion, cod_nacionalidad, nacionalidad, codigo, tipo_barcaza, matricula, arqueo_bruto, arqueo_neto, eslora, manga, puntal, cod_empresa, empresa,
        codigo_barcaza, descripcion_barcaza, codigo_bandera, descripcion_bandera, codigo_tipobarcaza, descripcion_tipobarcaza, matricula_barcaza, arqueobruto_barcaza, arqueoneto_barcaza, eslora_barcaza, puntal_barcaza, manga_barcaza, codigo_empresa, descripcion_empresa) {

    document.getElementById(codigo_barcaza).value = cod_barcaza;
    document.getElementById(descripcion_barcaza).value = descripcion;
    document.getElementById(codigo_bandera).value = cod_nacionalidad;
    document.getElementById(descripcion_bandera).value = nacionalidad;
    document.getElementById(codigo_tipobarcaza).value = codigo;
    document.getElementById(descripcion_tipobarcaza).value = tipo_barcaza;
    document.getElementById(matricula_barcaza).value = matricula;
    document.getElementById(arqueobruto_barcaza).value = arqueo_bruto;
    document.getElementById(arqueoneto_barcaza).value = arqueo_neto;
    document.getElementById(eslora_barcaza).value = eslora;
    document.getElementById(puntal_barcaza).value = puntal;
    document.getElementById(manga_barcaza).value = manga;
    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(descripcion_empresa).value = empresa;

    document.getElementById(descripcion_barcaza).disabled = false;
    document.getElementById(matricula_barcaza).disabled = false;
    document.getElementById(arqueobruto_barcaza).disabled = false;
    document.getElementById(arqueoneto_barcaza).disabled = false;
    document.getElementById(eslora_barcaza).disabled = false;
    document.getElementById(puntal_barcaza).disabled = false;
    document.getElementById(manga_barcaza).disabled = false;
    document.getElementById(codigo_bandera).disabled = false;
    document.getElementById(codigo_tipobarcaza).disabled = false;
    document.getElementById(codigo_empresa).disabled = false;
    document.getElementById(descripcion_barcaza).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}


function habilitaInputBarcaza(descripcion_barcaza, matricula_barcaza, arqueobruto_barcaza, arqueoneto_barcaza, eslora_barcaza,
        puntal_barcaza, manga_barcaza, codigo_bandera, codigo_tipobarcaza, codigo_empresa)
{
    var descripcion = document.getElementById(descripcion_barcaza);
    var matricula = document.getElementById(matricula_barcaza);
    var arqueobruto = document.getElementById(arqueobruto_barcaza);
    var arqueoneto = document.getElementById(arqueoneto_barcaza);
    var eslora = document.getElementById(eslora_barcaza);
    var puntal = document.getElementById(puntal_barcaza);
    var manga = document.getElementById(manga_barcaza);
    var bandera_descripcion = document.getElementById(codigo_bandera);
    var tipobarcaza = document.getElementById(codigo_tipobarcaza);
    var empresa = document.getElementById(codigo_empresa);

    descripcion.disabled = !descripcion.disabled;
    matricula.disabled = !matricula.disabled;
    arqueobruto.disabled = !arqueobruto.disabled;
    arqueoneto.disabled = !arqueoneto.disabled;
    eslora.disabled = !eslora.disabled;
    puntal.disabled = !puntal.disabled;
    manga.disabled = !manga.disabled;
    bandera_descripcion.disabled = !bandera_descripcion.disabled;
    tipobarcaza.disabled = !tipobarcaza.disabled;
    empresa.disabled = !empresa.disabled;

    document.getElementById(descripcion_barcaza).focus();
}

function mostrarBanderaBarcaza() {
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
                filas += "<td> <img onclick=\"recuperarBanderaBarcaza(" + json[i].cod_nacionalidad + " ,\n\
'" + json[i].descripcion + "',\n\
'codigo_bandera' , 'descripcion_bandera') \n\
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

function recuperarBanderaBarcaza(codigo, descripcion,
        codigo_bandera, descripcion_bandera) {
    document.getElementById(codigo_bandera).value = codigo;
    document.getElementById(descripcion_bandera).value = descripcion;
    document.getElementById('descripcion_bandera').focus();
    document.getElementById('datos_AbuscarBandera').style.display = 'none';
}

function mostrarTipoBarcaza() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_BarcazaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].codigo + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].simbolo + "</td>";
                filas += "<td> <img onclick=\"recuperarTipoBarcaza(" + json[i].codigo + " ,\n\
'" + json[i].descripcion + "',\n\
'codigo_tipobarcaza' , 'descripcion_tipobarcaza') \n\
\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaTipoBarcaza").innerHTML = filas;
            document.getElementById('datos_AbuscarTipoBarcaza').style.display = 'block';
            document.getElementById("filtro_buscadorTipoBarcaza").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarTipoBarcaza(codigo, tipo_barcaza,
        codigo_tipobarcaza, descripcion_tipobarcaza) {
    document.getElementById(codigo_tipobarcaza).value = codigo;
    document.getElementById(descripcion_tipobarcaza).value = tipo_barcaza;
    document.getElementById('matricula_barcaza').focus();
    document.getElementById('datos_AbuscarTipoBarcaza').style.display = 'none';
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
'" + json[i].descripcion + "',\n\
'codigo_empresa', 'descripcion_empresa') \n\
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

function recuperarEmpresa(cod_empresa, empresa,
        codigo_empresa, descripcion_empresa) {
    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(descripcion_empresa).value = empresa;
    document.getElementById('descripcion_empresa').focus();
    document.getElementById('datos_AbuscarEmpresa').style.display = 'none';
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

function  limpiarBarcaza() {

    document.getElementById("codigo_barcaza").disabled = true;
    document.getElementById("descripcion_barcaza").disabled = true;
    document.getElementById("codigo_bandera").disabled = true;
    document.getElementById("descripcion_bandera").disabled = true;
    document.getElementById("codigo_tipobarcaza").disabled = true;
    document.getElementById("descripcion_tipobarcaza").disabled = true;
    document.getElementById("matricula_barcaza").disabled = true;
    document.getElementById("arqueobruto_barcaza").disabled = true;
    document.getElementById("arqueoneto_barcaza").disabled = true;
    document.getElementById("eslora_barcaza").disabled = true;
    document.getElementById("puntal_barcaza").disabled = true;
    document.getElementById("manga_barcaza").disabled = true;
    document.getElementById("codigo_empresa").disabled = true;
    document.getElementById("descripcion_empresa").disabled = true;

    document.getElementById("form_barcaza").reset();
}