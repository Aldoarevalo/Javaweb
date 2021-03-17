recuperarComboEmpresa();
recuperarComboCiudad();

function procesarJSON(bandera) {
    valores = {
        bandera: bandera,
        cod_sucursal: (document.getElementById('codigo_sucursal').value === '' ? 0 : document.getElementById('codigo_sucursal').value),
        nro_sucursal: document.getElementById('sucursal_numero').value,
        descripcion: document.getElementById('sucursal_descripcion').value,
        direccion: document.getElementById('sucursal_direccion').value,
        cod_empresa: document.getElementById('menuEmpresa').value,
        cod_ciudad: document.getElementById('menuCiudad').value
    };
    enviar();
}

function enviar() {
    var xmlhttp = new XMLHttpRequest();   // objeto para peticion vía ajax 
    xmlhttp.open("POST", "/JavaWeb_Compras/SucursalCTR");// tipo de envio -  destino de envio
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Es el formato de envio de datos  
    xmlhttp.send(JSON.stringify(valores));
}

function agregarSuc() {
    var verificar_nro_sucursal = $('#sucursal_numero').val();
    var verificar_descripcion = $('#sucursal_descripcion').val();
    var verificar_direccion = $('#sucursal_direccion').val();
    var verificar_empresa = $('#menuEmpresa').val();
    var verificar_ciudad = $('#menuCiudad').val();

    if (verificar_nro_sucursal.length === 0 || verificar_descripcion.length === 0
            || verificar_direccion.length === 0 || verificar_empresa.length === 0
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

function modificarSuc() {
    var verificar_nro_sucursal = $('#sucursal_numero').val();
    var verificar_descripcion = $('#sucursal_descripcion').val();
    var verificar_direccion = $('#sucursal_direccion').val();
    var verificar_empresa = $('#menuEmpresa').val();
    var verificar_ciudad = $('#menuCiudad').val();
    var verificar_cod_sucursal = $('#codigo_sucursal').val();

    if (verificar_nro_sucursal.length === 0 || verificar_descripcion.length === 0
            || verificar_direccion.length === 0 || verificar_empresa.length === 0
            || verificar_ciudad === 0 || verificar_cod_sucursal === 0) {
        alert('Debe completar todos los campos');
    } else {
        if (confirm('Confirmar la modificación de Datos')) {
            procesarJSON(2);
        } else {
            //limpiar();
        }
    }
}

function eliminarSuc() {
    var verificar_cod_sucursal = $('#codigo_sucursal').val();
    if (verificar_cod_sucursal.length === 0) {
        alert('Debe Seleccionar el registro a ser Eliminado');
    } else {
        if (confirm('Confirmar la eliminación de Datos')) {
            procesarJSON(3);
        } else {
            //limpiar();
        }
    }
}

function recuperarSucursal() {
    var xhr = new XMLHttpRequest(),
            method = "POST",
            url = "/JavaWeb_Compras/SucursalCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            for (i = 0; i < json.length; i++) {
                document.getElementById('sucursal_numero').value = json[i].nro_sucursal;
                document.getElementById('sucursal_descripcion').value = json[i].descripcion;
                document.getElementById('sucursal_direccion').value = json[i].direccion;
                document.getElementById('menuEmpresa').value = json[i].cod_empresa;
                document.getElementById('menuCiudad').value = json[i].cod_ciudad;
            }
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 4, cod_sucursal:
                document.getElementById('codigo_sucursal').value}));
    document.getElementById("sucursal_numero").focus();
}

function mostrarTablaSucursal() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/SucursalCTR";
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
                filas += "<td>" + json[i].cod_sucursal + "</td>";
                filas += "<td>" + json[i].nro_sucursal + "</td>";
                filas += "<td>" + json[i].descripcion + "</td>";
                filas += "<td>" + json[i].direccion + "</td>";
//                filas += "<td>" + json[i].cod_empresa + "</td>";
                filas += "<td>" + json[i].descripcion_empresa + "</td>";
//                filas += "<td>" + json[i].cod_ciudad + "</td>";
                filas += "<td>" + json[i].descripcion_ciudad + "</td>";
                filas += "<td> <img onclick=\"recuperarDeBuscador(" + json[i].cod_sucursal + " ,\n\
'" + json[i].nro_sucursal + "' ,\n\
'" + json[i].descripcion + "' ,\n\
'" + json[i].direccion + "' ,\n\
'" + json[i].cod_empresa + "',\n\
'" + json[i].descripcion_empresa + "',\n\
'" + json[i].cod_ciudad + "',\n\
'" + json[i].descripcion_ciudad + "',\n\
'codigo_sucursal' , \n\
'sucursal_numero', \n\
'sucursal_descripcion', \n\
'sucursal_direccion', \n\
'menuEmpresa', \n\
'menuCiudad')\" src=\"../Recursos/Img/select.png\" alt=\"Sel\"/></td>";
                filas += "</tr>";
            }
            document.getElementById("TablaSucursal").innerHTML = filas;
            document.getElementById('datos_Abuscar').style.display = 'block';
            document.getElementById("filtro_buscador_Sucursal").focus();
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 5}));
}

function buscadorSucursal() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filtro_buscador_Sucursal");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaSucursal");
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

function recuperarDeBuscador(cod_sucursal, nro_sucursal, descripcion, direccion, cod_empresa, descripcion_empresa, cod_ciudad, descripcion_ciudad,
        codigo_sucursal, sucursal_numero, sucursal_descripcion, sucursal_direccion, menuEmpresa, menuCiudad) {

    document.getElementById(sucursal_numero).disabled = false;
    document.getElementById(sucursal_descripcion).disabled = false;
    document.getElementById(sucursal_direccion).disabled = false;
    document.getElementById(menuEmpresa).disabled = false;
    document.getElementById(menuCiudad).disabled = false;

    document.getElementById(codigo_sucursal).value = cod_sucursal;
    document.getElementById(sucursal_numero).value = nro_sucursal;
    document.getElementById(sucursal_descripcion).value = descripcion;
    document.getElementById(sucursal_direccion).value = direccion;
    document.getElementById(menuEmpresa).value = cod_empresa;
//    document.getElementById(menuEmpresa).value = descripcion_empresa;
    document.getElementById(menuCiudad).value = cod_ciudad;
//    document.getElementById(menuCiudad).value = descripcion_ciudad;

    document.getElementById(sucursal_descripcion).focus();

    document.getElementById('datos_Abuscar').style.display = 'none';
}

function recuperarComboEmpresa() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/SucursalCTR";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText); //reponseText returns the entire JSON file and we assign it to a javascript variable "json".
            var i;
            var valorOption = "";
            valorOption += "<option value=0>--------------------</option>";
            for (i = 0; i < json.length; i++) {
                valorOption += "<option value=" + json[i].cod_empresa + ">" + json[i].descripcion + "</option>";
            }
            document.getElementById("menuEmpresa").innerHTML = valorOption;
        }
    };
    xhr.send(JSON.stringify(datos = {bandera: 6}));
}

function recuperarComboCiudad() {
    var xhr = new XMLHttpRequest(), //
            method = "POST",
            url = "/JavaWeb_Compras/SucursalCTR";
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
    xhr.send(JSON.stringify(datos = {bandera: 7}));
}

function limpiarSucursal() {
    document.getElementById("form_sucursal").reset();
    
    document.getElementById("codigo_sucursal").disabled = true;
    document.getElementById("sucursal_numero").disabled = true;
    document.getElementById("sucursal_descripcion").disabled = true;
    document.getElementById("sucursal_direccion").disabled = true;
    document.getElementById("menuEmpresa").disabled = true;
    document.getElementById("menuCiudad").disabled = true;
}

function habilitaInputSucursal(sucursal_numero, sucursal_descripcion, sucursal_direccion, menuEmpresa, menuCiudad){
    var nro = document.getElementById(sucursal_numero);
    var descripcion = document.getElementById(sucursal_descripcion);
    var direccion = document.getElementById(sucursal_direccion);
    var empresa = document.getElementById(menuEmpresa);
    var ciudad = document.getElementById(menuCiudad);

    nro.disabled = !nro.disabled;
    descripcion.disabled = !descripcion.disabled;
    direccion.disabled = !direccion.disabled;
    empresa.disabled = !empresa.disabled;
    ciudad.disabled = !ciudad.disabled;

    document.getElementById(sucursal_numero).focus();
}