//alert('conecta con el html');
recuperarComboCiudad();
recuperarComboNacionalidad();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_banco: (document.getElementById('codigo_banco').value === '' ? 0 : document.getElementById('codigo_banco').value),
        descripcion: document.getElementById('descripcion_banco').value,
        ruc: document.getElementById('ruc_banco').value,
        telefono: document.getElementById('telefono_banco').value,
        direccion: document.getElementById('direccion_banco').value,
        correo: document.getElementById('correo_banco').value,
        cod_ciudad: document.getElementById('menuCiudad').value,
        cod_nacionalidad: document.getElementById('menuNacionalidad').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/BancoCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarBanco() {
    var verificar_descripcion = $('#descripcion_banco').val();
    var verificar_ruc = $('#ruc_banco').val();
    var verificar_telefono = $('#telefono_banco').val();
    var verificar_direccion = $('#direccion_banco').val();
    var verificar_correo = $('#correo_banco').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono.length === 0 || verificar_direccion.length === 0
            || verificar_correo.length === 0 || verificar_ciudad === 0
            || verificar_nacionalidad === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarBanco() {
    var verificar_descripcion = $('#descripcion_banco').val();
    var verificar_ruc = $('#ruc_banco').val();
    var verificar_telefono = $('#telefono_banco').val();
    var verificar_direccion = $('#direccion_banco').val();
    var verificar_correo = $('#correo_banco').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();
    var verificar_codigo = $('#codigo_banco').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono.length === 0 || verificar_direccion.length === 0
            || verificar_correo.length === 0 || verificar_ciudad === 0
            || verificar_nacionalidad === 0 || verificar_codigo.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarBanco() {
    var verificar_codigo = $('#codigo_banco').val();
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

function recuperarBanco() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/BancoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_banco').value = json[i].descripcion;
                document.getElementById('ruc_banco').value = json[i].ruc;
                document.getElementById('telefono_banco').value = json[i].telefono;
                document.getElementById('direccion_banco').value = json[i].direccion;
                document.getElementById('correo_banco').value = json[i].correo;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
                document.getElementById('menuNacionalidad').value = json[i].cod_nacionalidad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_banco:
                document.getElementById('codigo_banco').value}));
    document.getElementById("descripcion_banco").focus();
}

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/BancoCTR";
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
            url = "/JavaWeb_Compras/BancoCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>"
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_nacionalidad + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuNacionalidad").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 7}));
}

function mostrarTablaBanco() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/BancoCTR";
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
                filas += "<td>" + json[i].cod_banco + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td>" + json[i].telefono + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
                filas += "<td>" + json[i].correo + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].ciudad_descripcion + "</td>";
//                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].nacionalidad_descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_banco + " ,\n\
'" + json[i].descripcion + "' ,\n\
'" + json[i].ruc + "' ,\n\
'" + json[i].telefono + "',\n\
'" + json[i].direccion + "',\n\
'" + json[i].correo + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].descripcion_ciudad + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].descripcion_nacionalidad + "',\n\
'codigo_banco' , \n\
'descripcion_banco', \n\
'ruc_banco', \n\
'telefono_banco', \n\
'direccion_banco', \n\
'correo_banco', \n\
'menuCiudad', \n\
'menuNacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaBanco").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Banco").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorBanco() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Banco");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaBanco");
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

function recuperarDeBuscador(cod_banco, descripcion, ruc, telefono, direccion, correo, cod_ciudad, ciudad_descripcion, cod_nacionalidad, nacionalidad_descripcion,
        codigo_banco, descripcion_banco, ruc_banco, telefono_banco, direccion_banco, correo_banco, menuCiudad, menuNacionalidad) {

    document.getElementById(descripcion_banco).disabled = false;
    document.getElementById(ruc_banco).disabled = false;
    document.getElementById(telefono_banco).disabled = false;
    document.getElementById(direccion_banco).disabled = false;
    document.getElementById(correo_banco).disabled = false;
    document.getElementById(menuCiudad).disabled = false;
    document.getElementById(menuNacionalidad).disabled = false;

    document.getElementById(codigo_banco).value = cod_banco;
    document.getElementById(descripcion_banco).value = descripcion;
    document.getElementById(ruc_banco).value = ruc;
    document.getElementById(telefono_banco).value = telefono;
    document.getElementById(direccion_banco).value = direccion;
    document.getElementById(correo_banco).value = correo;
    document.getElementById(menuCiudad).value = cod_ciudad;
//    document.getElementById(menuCiudad).value = ciudad_descripcion;
    document.getElementById(menuNacionalidad).value = cod_nacionalidad;
//    document.getElementById(menuNacionalidad).value = nacionalidad_descripcion;
    document.getElementById(descripcion_banco).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function limpiarBanco() {
    document.getElementById("form_banco").reset();

    document.getElementById("codigo_banco").disabled = true;
    document.getElementById("descripcion_banco").disabled = true;
    document.getElementById("ruc_banco").disabled = true;
    document.getElementById("telefono_banco").disabled = true;
    document.getElementById("direccion_banco").disabled = true;
    document.getElementById("correo_banco").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
    document.getElementById("menuNacionalidad").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputBanco(descripcion_banco, ruc_banco, telefono_banco, direccion_banco, correo_banco, menuCiudad, menuNacionalidad)
{
    var descripcion = document.getElementById(descripcion_banco);
    var ruc = document.getElementById(ruc_banco);
    var telefono = document.getElementById(telefono_banco);
    var direccion = document.getElementById(direccion_banco);
    var correo = document.getElementById(correo_banco);
    var Ciudad = document.getElementById(menuCiudad);
    var Nacionalidad = document.getElementById(menuNacionalidad);

    descripcion.disabled = !descripcion.disabled;
    ruc.disabled = !ruc.disabled;
    telefono.disabled = !telefono.disabled;
    direccion.disabled = !direccion.disabled;
    correo.disabled = !correo.disabled;
    Ciudad.disabled = !Ciudad.disabled;
    Nacionalidad.disabled = !Nacionalidad.disabled;

    document.getElementById(descripcion_banco).focus();
}

//function hola() {
//    document.getElementById("codigo_banco").disabled = true;
//    document.getElementById("descripcion_banco").disabled = true;
//    document.getElementById("ruc_banco").disabled = true;
//    document.getElementById("telefono_banco").disabled = true;
//    document.getElementById("direccion_banco").disabled = true;
//    document.getElementById("correo_banco").disabled = true;
//    document.getElementById("menuCiudad").disabled = true;
//    document.getElementById("menuNacionalidad").disabled = true;
//
//    document.getElementById("codigo_banco").value = "";
//    document.getElementById("descripcion_banco").value = "";
//    document.getElementById("ruc_banco").value = "";
//    document.getElementById("telefono_banco").value = "";
//    document.getElementById("direccion_banco").value = "";
//    document.getElementById("correo_banco").value = "";
//    document.getElementById("menuCiudad").value = 0;
//    document.getElementById("menuNacionalidad").value = 0;
//    document.getElementById("filtro_buscador_Banco").value = "";
//}