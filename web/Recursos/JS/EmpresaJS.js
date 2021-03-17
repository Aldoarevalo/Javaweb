recuperarComboCiudad();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_empresa: (document.getElementById('codigo_empresa').value === '' ? 0 : document.getElementById('codigo_empresa').value),
        descripcion: document.getElementById('nombre_empresa').value,
        ruc: document.getElementById('ruc_empresa').value,
        telefono: document.getElementById('telefono_empresa').value,
        direccion: document.getElementById('direccion_empresa').value,
        cod_ciudad: document.getElementById('menuCiudad').value

    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/EmpresaCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarEmpresa() {
    var verificar_descripcion = $('#nombre_empresa').val();
    var verificar_ruc = $('#ruc_empresa').val();
    var verificar_telefono = $('#telefono_empresa').val();
    var verificar_direccion = $('#direccion_empresa').val();
    var verificar_ciudad = $('#menuCiudad').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono === 0 || verificar_direccion === 0
            || verificar_ciudad === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la inserción de Datos')) {
            procesarJSON(1);
        } else {
            //limpiar();
        }
    }
}

function modificarEmpresa() {
    var verificar_descripcion = $('#nombre_empresa').val();
    var verificar_ruc = $('#ruc_empresa').val();
    var verificar_telefono = $('#telefono_empresa').val();
    var verificar_direccion = $('#direccion_empresa').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_codigo = $('#codigo_empresa').val();

    if (verificar_descripcion.length === 0 || verificar_ruc.length === 0
            || verificar_telefono === 0 || verificar_direccion === 0
            || verificar_ciudad === 0 || verificar_codigo === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarEmpresa() {
    var verificar_codigo = $('#codigo_empresa').val();
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

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpresaCTR";
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

function recuperarEmpresa() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/EmpresaCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('nombre_empresa').value = json[i].descripcion;
                document.getElementById('ruc_empresa').value = json[i].ruc;
                document.getElementById('telefono_empresa').value = json[i].telefono;
                document.getElementById('direccion_empresa').value = json[i].direccion;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_empresa:
                document.getElementById('codigo_empresa').value}));
    document.getElementById("nombre_empresa").focus();
}

function mostrarTablaEmpresa() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/EmpresaCTR";
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
                filas += "<td>" + json[i].cod_empresa + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].ruc + "</td>";
                filas += "<td>" + json[i].telefono + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].ciudad_descripcion + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_empresa + " ,\n\
'" + json[i].descripcion + "' ,\n\
'" + json[i].ruc + "' ,\n\
'" + json[i].telefono + "',\n\
'" + json[i].direccion + "',\n\
'" + json[i].cod_ciudad + "',\n\
\n\'" + json[i].ciudad_descripcion + "',\n\
'codigo_empresa' , \n\
'nombre_empresa', \n\
'ruc_empresa', \n\
'telefono_empresa', \n\
'direccion_empresa', \n\
'menuCiudad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaEmpresa").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Empresa").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function recuperarDeBuscador(cod_empresa, descripcion, ruc, telefono, direccion, cod_ciudad, ciudad_descripcion,
        codigo_empresa, nombre_empresa, ruc_empresa, telefono_empresa, direccion_empresa, menuCiudad) {

    document.getElementById(codigo_empresa).disabled = true;
    document.getElementById(nombre_empresa).disabled = false;
    document.getElementById(ruc_empresa).disabled = false;
    document.getElementById(telefono_empresa).disabled = false;
    document.getElementById(direccion_empresa).disabled = false;
    document.getElementById(menuCiudad).disabled = false;

    document.getElementById(codigo_empresa).value = cod_empresa;
    document.getElementById(nombre_empresa).value = descripcion;
    document.getElementById(ruc_empresa).value = ruc;
    document.getElementById(telefono_empresa).value = telefono;
    document.getElementById(direccion_empresa).value = direccion;
    document.getElementById(menuCiudad).value = cod_ciudad;
    document.getElementById(nombre_empresa).focus();
    document.getElementById('datos_Abuscar').style.display = 'none';
}

function buscadorEmpresa() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Empresa");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaEmpresa");
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

function limpiarEmpresa() {

    document.getElementById("codigo_empresa").disabled = true;
    document.getElementById("nombre_empresa").disabled = true;
    document.getElementById("ruc_empresa").disabled = true;
    document.getElementById("telefono_empresa").disabled = true;
    document.getElementById("direccion_empresa").disabled = true;
    document.getElementById("menuCiudad").disabled = true;

    document.getElementById("form_empresa").reset();
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

function habilitaInputEmpresa(nombre_empresa, ruc_empresa, telefono_empresa, direccion_empresa, menuCiudad)
{
    var descripcion = document.getElementById(nombre_empresa);
    var ruc = document.getElementById(ruc_empresa);
    var telefono = document.getElementById(telefono_empresa);
    var direccion = document.getElementById(direccion_empresa);
    var ciudad = document.getElementById(menuCiudad);

    descripcion.disabled = !descripcion.disabled;
    ruc.disabled = !ruc.disabled;
    telefono.disabled = !telefono.disabled;
    direccion.disabled = !direccion.disabled;
    ciudad.disabled = !ciudad.disabled;

    document.getElementById(nombre_empresa).focus();
}