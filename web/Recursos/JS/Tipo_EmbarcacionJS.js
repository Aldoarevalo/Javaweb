//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_tipo: (document.getElementById('codigo_tipoembarcacion').value === '' ? 0 : document.getElementById('codigo_tipoembarcacion').value),
        descripcion: document.getElementById('descripcion_tipoembarcacion').value,
        simbolo: document.getElementById('simbolo_tipoembarcacion').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/Tipo_EmbarcacionCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}

function agregarTipoEmbarcacion() {
    var verificar_descripcion = $('#descripcion_tipoembarcacion').val();
    var verificar_simbolo = $('#simbolo_tipoembarcacion').val();

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

function modificarTipoEmbarcacion() {
    var verificar_descripcion = $('#descripcion_tipoembarcacion').val();
    var verificar_codigo = $('#codigo_tipoembarcacion').val();
    if (verificar_descripcion.length === 0 || verificar_codigo.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarTipoEmbarcacion() {
    var verificar_codigo = $('#codigo_tipoembarcacion').val();
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

function recuperarTipoEmbarcacion() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_EmbarcacionCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_tipoembarcacion').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_tipo:
                document.getElementById('codigo_tipoembarcacion').value}));
    document.getElementById("descripcion_tipoembarcacion").disabled(false);
    document.getElementById('descripcion_tipoembarcacion').focus();
}

function mostrarTablaTipoEmbarcacion() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/Tipo_EmbarcacionCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
//            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
//                opcionL += "<option value= " + json[i].cod_departamento + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr onclick=\"recuperarDeBuscador(" + json[i].cod_tipo + " ,'" + json[i].descripcion + "' , '" + json[i].simbolo + "' , 'codigo_tipoembarcacion' , 'descripcion_tipoembarcacion', 'simbolo_tipoembarcacion')\">";
                filas += "<td>" + json[i].cod_tipo + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].simbolo + "</td>";
                filas += "<td> <img  src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaTipoEmbarcacion").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_TipoEmbarcacion").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorTipoEmbarcacion() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_TipoEmbarcacion");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaTipoEmbarcacion");
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

function recuperarDeBuscador(cod_tipo, descripcion, simbolo,
codigo_tipoembarcacion, descripcion_tipoembarcacion, simbolo_tipoembarcacion) {
    
    document.getElementById(codigo_tipoembarcacion).value = cod_tipo;
    document.getElementById(descripcion_tipoembarcacion).value = descripcion;
    document.getElementById(simbolo_tipoembarcacion).value = simbolo;
    
    document.getElementById(descripcion_tipoembarcacion).disabled = false;
    document.getElementById(simbolo_tipoembarcacion).disabled = false;
    
    document.getElementById(descripcion_tipoembarcacion).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarTipoEmbarcacion() {
    document.getElementById("form_tipoembarcacion").reset();

    document.getElementById("codigo_tipoembarcacion").disabled = true;
    document.getElementById("descripcion_tipoembarcacion").disabled = true;
    document.getElementById("simbolo_tipoembarcacion").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputTipoEmbarcacion(descripcion_tipoembarcacion, simbolo_tipoembarcacion)
{
    var descripcion = document.getElementById(descripcion_tipoembarcacion);
    var simbolo = document.getElementById(simbolo_tipoembarcacion);

    descripcion.disabled = !descripcion.disabled;
    simbolo.disabled = !simbolo.disabled;

    document.getElementById(descripcion_tipoembarcacion).focus();
}