function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_ciudad: (document.getElementById('codigo_ciudad').value === '' ? 0 : document.getElementById('codigo_ciudad').value),
        descripcion: document.getElementById('descripcion_ciudad').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/CiudadCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}


function agregarCiudad() {
    var verificar_1 = $('#descripcion_ciudad').val();

    if (verificar_1.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarCiudad() {
    var verificar_1 = $('#descripcion_ciudad').val();
    var verificar_2 = $('#codigo_ciudad').val();
    if (verificar_1.length === 0 || verificar_2.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarCiudad() {
    var verificar_2 = $('#codigo_ciudad').val();
    if (verificar_2.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarCiudadDes() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/CiudadCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_ciudad').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_ciudad:
                document.getElementById('codigo_ciudad').value}));
    document.getElementById("descripcion_ciudad").disabled(false);
    document.getElementById("descripcion_ciudad").focus();
}

function limpiarCiudad() {
    document.getElementById("form_ciudad").reset();

    document.getElementById("codigo_ciudad").disabled = true;
    document.getElementById("descripcion_ciudad").disabled = true;
}

function mostrarTablaCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/CiudadCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
                opcionL += "<option value= " + json[i].cod_ciudad + "> " +
                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_ciudad + " ,'" + json[i].descripcion + "' , 'codigo_ciudad' , 'descripcion_ciudad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";

            }
            document.getElementById("TablaCiudad").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Ciudad").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_ciudad, descripcion, codigo_ciudad, descripcion_ciudad) {

    document.getElementById(codigo_ciudad).value = cod_ciudad;
    document.getElementById(descripcion_ciudad).value = descripcion;

    document.getElementById(descripcion_ciudad).disabled = false;
    document.getElementById(descripcion_ciudad).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorCiudad() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Ciudad");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaCiudad");
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

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputCiudad(InputText)
{
    var input = document.getElementById(InputText);
    input.disabled = !input.disabled;
    document.getElementById(InputText).focus();
}