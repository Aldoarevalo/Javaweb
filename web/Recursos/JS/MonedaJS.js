//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_moneda: (document.getElementById('codigo_moneda').value === '' ? 0 : document.getElementById('codigo_moneda').value),
        descripcion: document.getElementById('descripcion_moneda').value,
        simbolo: document.getElementById('simbolo_moneda').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/MonedaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarMoneda() {
    procesarJSON(1);
}
function modificarMoneda() {
    procesarJSON(2);
}
function eliminarMoneda() {
    procesarJSON(3);
}

function recuperarMoneda() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MonedaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_moneda').value = json[i].descripcion;
                document.getElementById('simbolo_moneda').value = json[i].simbolo;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_moneda:
                document.getElementById('codigo_moneda').value}));
    document.getElementById('descripcion_moneda').focus();
}

function mostrarTablaMoneda() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/MonedaCTR";
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
                filas += "<tr>";
                filas += "<td>" + json[i].cod_moneda + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].simbolo + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_moneda + " ,'" + json[i].descripcion + "' , '" + json[i].simbolo + "', 'codigo_moneda' , 'descripcion_moneda', 'simbolo_moneda')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaMoneda").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';

            document.getElementById("filtro_buscador_Moneda").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorMoneda() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Moneda");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaMoneda");
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

function recuperarDeBuscador(cod_moneda, descripcion, simbolo,
        codigo_moneda, descripcion_moneda, simbolo_moneda) {
    document.getElementById(codigo_moneda).value = cod_moneda;
    document.getElementById(descripcion_moneda).value = descripcion;
    document.getElementById(simbolo_moneda).value = simbolo;
    document.getElementById(descripcion_moneda).disabled = false;
    document.getElementById(simbolo_moneda).disabled = false;

    document.getElementById(descripcion_moneda).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarMoneda() {
    document.getElementById("codigo_moneda").disabled = true;
    document.getElementById("descripcion_moneda").disabled = true;
    document.getElementById("simbolo_moneda").disabled = true;

    document.getElementById("form_moneda").reset();
}

function habilitaInputMoneda(descripcion_moneda, simbolo_moneda)
{
    var descripcion = document.getElementById(descripcion_moneda);
    var simbolo = document.getElementById(simbolo_moneda);

    descripcion.disabled = !descripcion.disabled;
    simbolo.disabled = !simbolo.disabled;

    document.getElementById(descripcion_moneda).focus();
}