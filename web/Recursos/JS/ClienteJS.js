//alert('conecta con el html');
recuperarComboCiudad();
recuperarComboNacionalidad();
//cargarTabla();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_cliente: (document.getElementById('codigo_cliente').value === '' ? 0 : document.getElementById('codigo_cliente').value),
        razon_social: document.getElementById('descripcion_cliente').value,
        ruc: document.getElementById('ruc').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        cod_ciudad: document.getElementById('menuCiudad').value,
        cod_nacionalidad: document.getElementById('menuNacionalidad').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/ClienteCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarCliente() {
    var verificar_descripcion = $('#descripcion_cliente').val();
    var verificar_ruc = $('#ruc').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono.length === 0 || verificar_direccion.length === 0
            || verificar_ciudad === 0 || verificar_nacionalidad === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarCliente() {
    var verificar_descripcion = $('#descripcion_cliente').val();
    var verificar_ruc = $('#ruc').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();
    var verificar_codigo = $('#codigo_cliente').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono.length === 0 || verificar_direccion.length === 0
            || verificar_ciudad === 0 || verificar_nacionalidad === 0
            || verificar_codigo.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarCliente() {
    var verificar_codigo = $('#codigo_cliente').val();
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

function recuperarCliente() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/ClienteCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_cliente').value = json[i].razon_social;
                document.getElementById('ruc').value = json[i].ruc;
                document.getElementById('telefono').value = json[i].telefono;
                document.getElementById('direccion').value = json[i].direccion;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
                document.getElementById('menuNacionalidad').value = json[i].cod_nacionalidad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_cliente:
                document.getElementById('codigo_cliente').value}));
    document.getElementById("descripcion_cliente").focus();
}

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ClienteCTR";
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
            url = "/JavaWeb_Compras/ClienteCTR";
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

function mostrarTablaCliente() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ClienteCTR";
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
                filas += "<td>" + json[i].cod_cliente + "</td>";
                filas += "<td>" + json[i].razon_social + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td>" + json[i].telefono + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].descripcion_ciudad + "</td>";
//                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].descripcion_nacionalidad + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_cliente + " ,\n\
'" + json[i].razon_social + "' ,\n\
'" + json[i].ruc + "' ,\n\
'" + json[i].telefono + "',\n\
'" + json[i].direccion + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].descripcion_ciudad + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].descripcion_nacionalidad + "',\n\
'codigo_cliente' , \n\
'descripcion_cliente', \n\
'ruc', \n\
'telefono', \n\
'direccion', \n\
'menuCiudad', \n\
'menuNacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaCliente").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Cliente").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorCliente() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Cliente");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaCliente");
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

function recuperarDeBuscador(Cliente, razon_social, ruc_1, telefono, direccion, cod_ciudad, ciudad_descripcion, cod_nacionalidad, nacionalidad_descripcion,
        codigo_cliente, descripcion_cliente, ruc, telefono_cliente, direccion_cliente, menuCiudad, menuNacionalidad) {

    document.getElementById(descripcion_cliente).disabled = false;
    document.getElementById(ruc).disabled = false;
    document.getElementById(telefono_cliente).disabled = false;
    document.getElementById(direccion_cliente).disabled = false;
    document.getElementById(menuCiudad).disabled = false;
    document.getElementById(menuNacionalidad).disabled = false;

    document.getElementById(codigo_cliente).value = Cliente;
    document.getElementById(descripcion_cliente).value = razon_social;
    document.getElementById(ruc).value = ruc_1;
    document.getElementById(telefono_cliente).value = telefono;
    document.getElementById(direccion_cliente).value = direccion;
    document.getElementById(menuCiudad).value = cod_ciudad;
//    document.getElementById(menuCiudad).value = ciudad_descripcion;
    document.getElementById(menuNacionalidad).value = cod_nacionalidad;
//    document.getElementById(menuNacionalidad).value = nacionalidad_descripcion;
    document.getElementById(descripcion_cliente).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function limpiarCliente() {
    document.getElementById("form_cliente").reset();

    document.getElementById("codigo_cliente").disabled = true;
    document.getElementById("descripcion_cliente").disabled = true;
    document.getElementById("ruc").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("direccion").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
    document.getElementById("menuNacionalidad").disabled = true;
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputCliente(descripcion_cliente, ruc, telefono_cliente, direccion_cliente, menuCiudad, menuNacionalidad)
{
    var descripcion = document.getElementById(descripcion_cliente);
    var ruc = document.getElementById(ruc);
    var telefono = document.getElementById(telefono_cliente);
    var direccion = document.getElementById(direccion_cliente);
    var Ciudad = document.getElementById(menuCiudad);
    var Nacionalidad = document.getElementById(menuNacionalidad);

    descripcion.disabled = !descripcion.disabled;
    ruc.disabled = !ruc.disabled;
    telefono.disabled = !telefono.disabled;
    direccion.disabled = !direccion.disabled;
    Ciudad.disabled = !Ciudad.disabled;
    Nacionalidad.disabled = !Nacionalidad.disabled;

    document.getElementById(descripcion_cliente).focus();
}