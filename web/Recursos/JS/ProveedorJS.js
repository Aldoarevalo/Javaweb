//alert('conecta con el html');
recuperarComboCiudad();
recuperarComboNacionalidad();
//cargarTabla();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        nro_proveedor: (document.getElementById('codigo_proveedor').value === '' ? 0 : document.getElementById('codigo_proveedor').value),
        razon_social: document.getElementById('descripcion_proveedor').value,
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
    xmlhttp.open("POST", "/JavaWeb_Compras/ProveedorCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarProveedor() {
    var verificar_razon_social = $('#descripcion_proveedor').val();
    var verificar_ruc = $('#ruc').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();

    if (verificar_razon_social.length === 0 || verificar_ruc.length === 0
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

function modificarProveedor() {
    var verificar_razon_social = $('#descripcion_proveedor').val();
    var verificar_ruc = $('#ruc').val();
    var verificar_telefono = $('#telefono').val();
    var verificar_direccion = $('#direccion').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_nacionalidad = $('#menuNacionalidad').val();
    var verificar_nro_proveedor = $('#codigo_proveedor').val();

    if (verificar_razon_social.length === 0 || verificar_ruc.length === 0
            || verificar_telefono.length === 0 || verificar_direccion.length === 0
            || verificar_ciudad === 0 || verificar_nacionalidad === 0
            || verificar_nro_proveedor.length === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarProveedor() {
    var verificar_nro_proveedor = $('#codigo_proveedor').val();
    if (verificar_nro_proveedor.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarProveedor() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/ProveedorCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('descripcion_proveedor').value = json[i].razon_social;
                document.getElementById('ruc').value = json[i].ruc;
                document.getElementById('telefono').value = json[i].telefono;
                document.getElementById('direccion').value = json[i].direccion;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
                document.getElementById('menuNacionalidad').value = json[i].cod_nacionalidad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, nro_proveedor:
                document.getElementById('codigo_proveedor').value}));
    document.getElementById("descripcion_proveedor").focus();
}

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ProveedorCTR";
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
            url = "/JavaWeb_Compras/ProveedorCTR";
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

function mostrarTablaProveedor() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/ProveedorCTR";
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
                filas += "<td>" + json[i].nro_proveedor + "</td>";
                filas += "<td>" + json[i].razon_social + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td>" + json[i].telefono + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].descripcion_ciudad + "</td>";
//                filas += "<td>" + json[i].cod_nacionalidad + "</td>";
                filas += "<td>" + json[i].descripcion_nacionalidad + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].nro_proveedor + " ,\n\
'" + json[i].razon_social + "' ,\n\
'" + json[i].ruc + "' ,\n\
'" + json[i].telefono + "',\n\
'" + json[i].direccion + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].descripcion_ciudad + "',\n\
'" + json[i].cod_nacionalidad + "',\n\
'" + json[i].descripcion_nacionalidad + "',\n\
'codigo_proveedor' , \n\
'descripcion_proveedor', \n\
'ruc', \n\
'telefono', \n\
'direccion', \n\
'menuCiudad', \n\
'menuNacionalidad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaProveedor").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Proveedor").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorPuerto() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Proveedor");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaProveedor");
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

function recuperarDeBuscador(nro_proveedor, razon_social, ruc_1, telefono, direccion, cod_ciudad, ciudad_descripcion, cod_nacionalidad, nacionalidad_descripcion,
        codigo_proveedor, descripcion_proveedor, ruc, telefono_emp, direccion_emp, menuCiudad, menuNacionalidad) {

    document.getElementById(descripcion_proveedor).disabled = false;
    document.getElementById(ruc).disabled = false;
    document.getElementById(telefono_emp).disabled = false;
    document.getElementById(direccion_emp).disabled = false;
    document.getElementById(menuCiudad).disabled = false;
    document.getElementById(menuNacionalidad).disabled = false;

    document.getElementById(codigo_proveedor).value = nro_proveedor;
    document.getElementById(descripcion_proveedor).value = razon_social;
    document.getElementById(ruc).value = ruc_1;
    document.getElementById(telefono_emp).value = telefono;
    document.getElementById(direccion_emp).value = direccion;
    document.getElementById(menuCiudad).value = cod_ciudad;
//    document.getElementById(menuCiudad).value = ciudad_descripcion;
    document.getElementById(menuNacionalidad).value = cod_nacionalidad;
//    document.getElementById(menuNacionalidad).value = nacionalidad_descripcion;
    document.getElementById(descripcion_proveedor).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function limpiarProveedor() {
    document.getElementById("form_proveedor").reset();
    
    document.getElementById("codigo_proveedor").disabled = true;
    document.getElementById("descripcion_proveedor").disabled = true;
    document.getElementById("ruc").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("direccion").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
    document.getElementById("menuNacionalidad").disabled = true;
    document.getElementById("filtro_buscador_Proveedor").disabled = true;
}

function habilitaInputProveedor(descripcion_proveedor, ruc_proveedor, telefono_proveedor, direccion_proveedor, menuCiudad, menuNacionalidad)
{
    var descripcion = document.getElementById(descripcion_proveedor);
    var ruc = document.getElementById(ruc_proveedor);
    var telefono = document.getElementById(telefono_proveedor);
    var direccion = document.getElementById(direccion_proveedor);
    var Ciudad = document.getElementById(menuCiudad);
    var Nacionalidad = document.getElementById(menuNacionalidad);

    descripcion.disabled = !descripcion.disabled;
    ruc.disabled = !ruc.disabled;
    telefono.disabled = !telefono.disabled;
    direccion.disabled = !direccion.disabled;
    Ciudad.disabled = !Ciudad.disabled;
    Nacionalidad.disabled = !Nacionalidad.disabled;

    document.getElementById(descripcion_proveedor).focus();
}