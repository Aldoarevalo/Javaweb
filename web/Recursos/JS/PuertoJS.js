recuperarComboCiudad();
recuperarComboNacionalidad();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_puerto: (document.getElementById('codigo_puerto').value === '' ? 0 : document.getElementById('codigo_puerto').value),
        descripcion: document.getElementById('descripcion_puerto').value,
        cod_ciudad: document.getElementById('menuCiudad').value,
        cod_nacionalidad: document.getElementById('menuNacionalidad').value

    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/PuertoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarPuerto() {
    var verificar_descripcion = $('#descripcion_puerto').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();

    if (verificar_descripcion.length === 0 || verificar_ciudad === 0 || verificar_nacionalidad === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarPuerto() {
    var verificar_descripcion = $('#descripcion_puerto').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();
    var verificar_codigo = $('#codigo_puerto').val();

    if (verificar_descripcion.length === 0 || verificar_ciudad === 0
            || verificar_nacionalidad === 0 || verificar_codigo === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarPuerto() {
    var verificar_codigo = $('#codigo_puerto').val();
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

function recuperarPuerto() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/PuertoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_puerto').value = json[i].descripcion;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
                document.getElementById('menuNacionalidad').value = json[i].cod_nacionalidad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_puerto:
                document.getElementById('codigo_puerto').value}));
    document.getElementById("descripcion_puerto").focus();
}

function mostrarTablaPuerto() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PuertoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var filas = "";
            for (i = 0; i < json.length; i++) {
                //aqui cargamos los datos a la tabla
                filas += "<tr>";
                filas += "<td>" + json[i].cod_puerto + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].ciudad_descripcion + "</td>";
                filas += "<td>" + json[i].nacionalidad_descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_puerto + ",\n\
'" + json[i].descripcion + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].ciudad_descripcion + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].nacionalidad_descripcion + "',\n\
'codigo_puerto', \n\
'descripcion_puerto', \n\
'menuCiudad',\n\
'menuNacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaPuerto").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Puerto").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_puerto, descripcion, cod_ciudad, ciudad_descripcion, cod_nacionalidad, nacionalidad_descripcion,
        codigo_puerto, descripcion_puerto, menuCiudad, menuNacionalidad) {
            
    document.getElementById(codigo_puerto).value = cod_puerto;
    document.getElementById(descripcion_puerto).value = descripcion;
    document.getElementById(menuCiudad).value = cod_ciudad;
    document.getElementById(menuNacionalidad).value = cod_nacionalidad;

    document.getElementById(descripcion_puerto).disabled = false;
    document.getElementById(menuCiudad).disabled = false;
    document.getElementById(menuNacionalidad).disabled = false;

    document.getElementById(descripcion_puerto).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
    
}

function buscadorPuerto() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Puerto");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaPuerto");
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

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PuertoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_ciudad + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuCiudad").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function recuperarComboNacionalidad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/PuertoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_nacionalidad + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuNacionalidad").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 7}));
}

function limpiarPuerto() {

    document.getElementById("codigo_puerto").disabled = true;
    document.getElementById("descripcion_puerto").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
    document.getElementById("menuNacionalidad").disabled = true;

    document.getElementById("form_puerto").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputPuerto(descripcion_puerto, menuCiudad, menuNacionalidad)
{
    var descripcion = document.getElementById(descripcion_puerto);
    var ciudad = document.getElementById(menuCiudad);
    var nacionalidad = document.getElementById(menuNacionalidad);

    descripcion.disabled = !descripcion.disabled;
    ciudad.disabled = !ciudad.disabled;
    nacionalidad.disabled = !nacionalidad.disabled;

    document.getElementById(descripcion_puerto).focus();
}