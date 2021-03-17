//alert('conecta con el html');
function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_nacionalidad: (document.getElementById('codigo_nacionalidad').value === '' ? 0 : document.getElementById('codigo_nacionalidad').value),
        descripcion: document.getElementById('descripcion_nacionalidad').value
    };
    enviar();
}
function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/NacionalidadCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));

}
function agregarNacionalidad() {
    var verificar_descripcion = $('#descripcion_nacionalidad').val();

    if (verificar_descripcion.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarNacionalidad() {
    var verificar_descripcion = $('#descripcion_nacionalidad').val();
    var verificar_codigo = $('#codigo_nacionalidad').val();
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

function eliminarNacionalidad() {
    var verificar_codigo = $('#codigo_nacionalidad').val();
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

function recuperarNacionalidad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/NacionalidadCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_nacionalidad').value = json[i].descripcion;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_nacionalidad:
                document.getElementById('codigo_nacionalidad').value}));
    document.getElementById('descripcion_nacionalidad').focus();
}

function mostrarTablaNacionalidad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/NacionalidadCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
//            var opcionL = "";
            var filas = "";
            for (i = 0; i < json.length; i++) {
//                opcionL += "<option value= " + json[i].cod_nacionalidad + "> " +
//                        json[i].descripcion + " </option>";
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_nacionalidad + " ,'" + json[i].descripcion + "' , 'codigo_nacionalidad' , 'descripcion_nacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";

            }
            document.getElementById("TablaNacionalidad").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Nacionalidad").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorNacionalidad() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Nacionalidad");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaNacionalidad");
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

function recuperarDeBuscador(cod_nacionalidad, descripcion, codigo_nacionalidad, descripcion_nacionalidad) {
    
    document.getElementById(codigo_nacionalidad).value = cod_nacionalidad;
    document.getElementById(descripcion_nacionalidad).value = descripcion;

    document.getElementById(descripcion_nacionalidad).disabled = false;
    document.getElementById(descripcion_nacionalidad).focus();
    
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function  limpiarNacionalidad() {
        document.getElementById("form_nacionalidad").reset();
    document.getElementById("codigo_nacionalidad").disabled = true;
    document.getElementById("descripcion_nacionalidad").disabled = true;
}

function habilitaInputNacionalidad(descripcion_nacionalidad)
{
    var nacionlidad = document.getElementById(descripcion_nacionalidad);
    nacionlidad.disabled = !nacionlidad.disabled;

    document.getElementById(descripcion_nacionalidad).focus();
}