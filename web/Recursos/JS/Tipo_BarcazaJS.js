//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        codigo: (document.getElementById('codigo_tipobarcaza').value === '' ? 0 : document.getElementById('codigo_tipobarcaza').value),
        descripcion: document.getElementById('descripcion_tipobarcaza').value,
        simbolo: document.getElementById('simbolo_tipobarcaza').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Tipo_BarcazaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}

function agregarTipoBarcaza(){
    var verificar_descripcion = $('#descripcion_tipobarcaza').val();
    var verificar_simbolo = $('#simbolo_tipobarcaza').val();

    if (verificar_descripcion.length === 0 || verificar_simbolo.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarTipoBarcaza() {
    var verificar_descripcion = $('#descripcion_tipobarcaza').val();
    var verificar_simbolo = $('#simbolo_tipobarcaza').val();
    var verificar_codigo = $('#codigo_tipobarcaza').val();
    if (verificar_descripcion.length === 0 || verificar_simbolo.length === 0 || verificar_codigo.length === 0) {
        alert('Debe Seleccionar el registro a ser Modificado');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarTipoBarcaza() {
    var verificar_codigo = $('#codigo_tipobarcaza').val();
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

function recuperarTipoBarcaza() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_BarcazaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_tipobarcaza').value = json[i].descripcion;
                document.getElementById('simbolo_tipobarcaza').value = json[i].simbolo;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, codigo:
                document.getElementById('codigo_tipobarcaza').value}));
    document.getElementById("descripcion_tipobarcaza").disabled(false);
    document.getElementById('descripcion_tipobarcaza').focus();
}

function mostrarTablaTipoBarcaza() {
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
//                opcionL += "<option value= " + json[i].cod_departamento + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr onclick=\"recuperarDeBuscador(\n\
" + json[i].codigo + " ,\n\
'" + json[i].descripcion + "' , \n\
'" + json[i].simbolo + "' , \n\
'codigo_tipobarcaza' , \n\
'descripcion_tipobarcaza', \n\
'simbolo_tipobarcaza')\">";
                filas += "<td>" + json[i].codigo + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].simbolo + "</td>";
                filas += "<td> <img  src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaTipoBarcaza").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_TipoBarcaza").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(codigo, descripcion, simbolo,
        codigo_tipobarcaza, descripcion_tipobarcaza, simbolo_tipobarcaza) {

    document.getElementById(codigo_tipobarcaza).value = codigo;
    document.getElementById(descripcion_tipobarcaza).value = descripcion;
    document.getElementById(simbolo_tipobarcaza).value = simbolo;

    document.getElementById(descripcion_tipobarcaza).disabled = false;
    document.getElementById(simbolo_tipobarcaza).disabled = false;

    document.getElementById(descripcion_tipobarcaza).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorTipoBarcaza() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_TipoBarcaza");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaTipoBarcaza");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function  limpiarTipoBarcaza() {
    document.getElementById("form_tipobarcazas").reset();

    document.getElementById("codigo_tipobarcaza").disabled = true;
    document.getElementById("descripcion_tipobarcaza").disabled = true;
    document.getElementById("simbolo_tipobarcaza").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputTipoBarcaza(descripcion_tipobarcaza, simbolo_tipobarcaza)
{
    var descripcion = document.getElementById(descripcion_tipobarcaza);
    var simbolo = document.getElementById(simbolo_tipobarcaza);

    descripcion.disabled = !descripcion.disabled;
    simbolo.disabled = !simbolo.disabled;

    document.getElementById(descripcion_tipobarcaza).focus();
}

